import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut, CheckCircle, XCircle, Search, UserCheck, AlertCircle, Users, User, Phone } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Registration {
  _id: string;
  registrationType: "solo" | "team";
  eventName: string;
  transactionUid: string;
  paymentScreenshotUrl: string;
  verified: boolean;
  createdAt: string;
  // Solo fields
  fullName?: string;
  // Team fields
  teamName?: string;
  teamLeader?: string;
  teamMembers?: string[];
  // Mixed use field (sometimes phone, sometimes size)
  teamNumber?: string;
}

interface User {
  _id: string;
  email: string;
  registrations: Registration[];
  createdAt: string;
}

// Flattened structure for table display
interface TableRow {
  userId: string;
  userEmail: string;
  registrationId: string;
  registrationType: "solo" | "team";
  eventName: string;
  // Display name: Team Name or Solo Full Name
  displayName: string; 
  // Extra details for modal/tooltip
  teamLeader?: string;
  teamMembers?: string[];
  
  teamNumber?: string; // Info field

  transactionUid: string;
  paymentScreenshotUrl: string;
  verified: boolean;
  regCreatedAt: string;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      if (!token) {
        navigate("/admin/login");
        return;
      }

      const response = await axios.get(
        `${import.meta.env.VITE_LOCAL_BACKENDURL}/admin/dashboard`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const usersList: User[] = Array.isArray(response.data) ? response.data : response.data.users || [];
      setUsers(usersList);
      processTableData(usersList);

    } catch (error: any) {
      console.error("Fetch Users Error:", error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("admin_token");
        navigate("/admin/login");
      }
      toast.error("Failed to load users.");
    } finally {
      setIsLoading(false);
    }
  };

  const processTableData = (usersData: User[]) => {
    const flattened: TableRow[] = [];
    usersData.forEach(user => {
        if (user.registrations && user.registrations.length > 0) {
            user.registrations.forEach(reg => {
                // Determine display name with fallbacks
                let name = "Unknown";
                if (reg.registrationType === 'team') {
                    name = reg.teamName || "Unnamed Team";
                } else {
                    name = reg.fullName || reg.teamName || "Unnamed User";
                }

                flattened.push({
                    userId: user._id,
                    userEmail: user.email,
                    registrationId: reg._id,
                    registrationType: reg.registrationType,
                    eventName: reg.eventName,
                    displayName: name,
                    teamLeader: reg.teamLeader,
                    teamMembers: reg.teamMembers,
                    teamNumber: reg.teamNumber,
                    transactionUid: reg.transactionUid,
                    paymentScreenshotUrl: reg.paymentScreenshotUrl,
                    verified: reg.verified,
                    regCreatedAt: reg.createdAt
                });
            });
        }
    });
    // Sort by newest first
    flattened.sort((a, b) => new Date(b.regCreatedAt).getTime() - new Date(a.regCreatedAt).getTime());
    setTableData(flattened);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
    toast.info("Logged out successfully");
  };

  const toggleVerification = async (registrationId: string, currentStatus: boolean) => {
    try {
      const token = localStorage.getItem("admin_token");
      const newStatus = !currentStatus;
      
      const response = await axios.post(
        `${import.meta.env.VITE_LOCAL_BACKENDURL}/admin/update-verification`,
        { registrationId, verified: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success(`Registration ${newStatus ? "verified" : "un-verified"} successfully`);
        
        // Update local state
        const updatedTable = tableData.map(row => 
            row.registrationId === registrationId ? { ...row, verified: newStatus } : row
        );
        setTableData(updatedTable);
        
        // Also update users state if needed
        const updatedUsers = users.map(user => ({
            ...user,
            registrations: user.registrations?.map(reg => 
                reg._id === registrationId ? { ...reg, verified: newStatus } : reg
            )
        }));
        setUsers(updatedUsers);

      } else {
        toast.error(response.data.message || "Update failed");
      }
    } catch (error) {
      console.error("Update Error:", error);
      toast.error("Failed to update status");
    }
  };

  const filteredData = tableData.filter(row => 
    row.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) || 
    row.transactionUid.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.displayName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | IMPACT 2026</title>
      </Helmet>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
          {/* Custom minimal navbar for admin */}
          <nav className="border-b border-border/20 bg-background/50 backdrop-blur-md sticky top-0 z-50">
              <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                  <span className="font-bebas text-2xl text-accent">Admin Portal</span>
                  <Button variant="ghost" size="sm" onClick={handleLogout} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                  </Button>
              </div>
          </nav>

        <main className="flex-grow container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                 <h1 className="font-bebas text-4xl">Registrations</h1>
                 <div className="relative w-full md:w-auto">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 rounded-lg bg-card/50 border border-border/30 focus:border-accent outline-none w-full md:w-64"
                    />
                 </div>
            </div>

          <div className="bg-card/20 border border-border/30 rounded-xl overflow-hidden">
             <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-card/40 text-left border-b border-border/30">
                            <th className="p-4 font-poppins font-medium text-foreground/70">Type</th>
                            <th className="p-4 font-poppins font-medium text-foreground/70">Name/Team</th>
                            <th className="p-4 font-poppins font-medium text-foreground/70">Event</th>
                            <th className="p-4 font-poppins font-medium text-foreground/70">Contact/Info</th>
                            <th className="p-4 font-poppins font-medium text-foreground/70">Txn ID</th>
                            <th className="p-4 font-poppins font-medium text-foreground/70">Screenshot</th>
                            <th className="p-4 font-poppins font-medium text-foreground/70">Status</th>
                            <th className="p-4 font-poppins font-medium text-foreground/70">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="p-8 text-center text-foreground/50">No registrations found.</td>
                            </tr>
                        ) : (
                            filteredData.map((row) => (
                                <tr key={row.registrationId} className="border-b border-border/10 hover:bg-white/5 transition-colors">
                                    <td className="p-4">
                                        {row.registrationType === 'team' ? (
                                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-purple-500/10 text-purple-400 text-xs border border-purple-500/20">
                                                <Users className="w-3 h-3" /> Team
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs border border-blue-500/20">
                                                <User className="w-3 h-3" /> Solo
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4 font-medium">
                                        <div className="flex items-center gap-2">
                                            <div className="flex flex-col">
                                                <span>{row.displayName}</span>
                                                <span className="text-xs text-foreground/40">{row.userEmail}</span>
                                            </div>
                                            
                                            {row.registrationType === 'team' && (
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-5 w-5 opacity-50 hover:opacity-100">
                                                            <Users className="w-3 h-3" />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>{row.displayName} - Team Details</DialogTitle>
                                                        </DialogHeader>
                                                        <div className="space-y-4 pt-4">
                                                            <div>
                                                                <h4 className="text-sm font-medium text-foreground/70">Team Leader</h4>
                                                                <p className="text-base">{row.teamLeader}</p>
                                                            </div>
                                                            <div>
                                                                <h4 className="text-sm font-medium text-foreground/70 mb-2">Team Members</h4>
                                                                <ul className="list-disc pl-5 space-y-1">
                                                                    {row.teamMembers?.map((member, i) => (
                                                                        <li key={i}>{member}</li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4">{row.eventName}</td>
                                    <td className="p-4 font-mono text-xs">
                                        {row.teamNumber ? (
                                           <span title="Team Number / Phone">{row.teamNumber}</span>
                                        ) : (
                                            <span className="opacity-30">-</span>
                                        )}
                                    </td>
                                    <td className="p-4 font-mono text-xs">{row.transactionUid}</td>
                                    <td className="p-4">
                                        {row.paymentScreenshotUrl ? (
                                            <a 
                                                href={row.paymentScreenshotUrl} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-accent hover:underline text-xs"
                                            >
                                                View
                                            </a>
                                        ) : (
                                            <span className="text-foreground/30 text-xs">N/A</span>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        {row.verified ? (
                                            <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-xs gap-1 border border-green-500/20">
                                                <CheckCircle className="w-3 h-3" /> Ver.
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-xs gap-1 border border-yellow-500/20">
                                                <AlertCircle className="w-3 h-3" /> Pen.
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <Button 
                                            size="sm" 
                                            variant={row.verified ? "secondary" : "default"}
                                            onClick={() => toggleVerification(row.registrationId, !!row.verified)}
                                            className={`h-8 px-3 text-xs ${!row.verified ? "bg-accent hover:bg-accent/90 text-accent-foreground" : ""}`}
                                        >
                                            <UserCheck className="w-3 h-3 mr-1" />
                                            {row.verified ? "Undo" : "Verify"}
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
             </div>
          </div>
        </main>
      </div>
    </>
  );
};
export default AdminDashboard;
