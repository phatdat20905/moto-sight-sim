import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Car, 
  Activity, 
  AlertTriangle, 
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  TrendingDown,
  UserCheck
} from "lucide-react";

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data
  const stats = {
    totalUsers: 1247,
    activeUsers: 892,
    totalVehicles: 1534,
    alertsToday: 23
  };

  const recentUsers = [
    { id: 1, name: "Nguyễn Văn An", email: "an@email.com", status: "active", joinDate: "2023-12-01", vehicle: "Honda CBR 250R" },
    { id: 2, name: "Trần Thị Bình", email: "binh@email.com", status: "inactive", joinDate: "2023-11-28", vehicle: "Yamaha Exciter" },
    { id: 3, name: "Lê Văn Cường", email: "cuong@email.com", status: "active", joinDate: "2023-12-03", vehicle: "Suzuki GSX-R150" },
    { id: 4, name: "Phạm Thị Dung", email: "dung@email.com", status: "pending", joinDate: "2023-12-05", vehicle: "Honda Winner X" },
    { id: 5, name: "Hoàng Văn Em", email: "em@email.com", status: "active", joinDate: "2023-12-02", vehicle: "Kawasaki Ninja 250" },
  ];

  const recentAlerts = [
    { id: 1, user: "Nguyễn Văn An", type: "speed", message: "Vượt quá tốc độ cho phép", time: "2 phút trước", severity: "high" },
    { id: 2, user: "Trần Thị Bình", type: "lane", message: "Chuyển làn không báo hiệu", time: "5 phút trước", severity: "medium" },
    { id: 3, user: "Lê Văn Cường", type: "obstacle", message: "Phát hiện vật cản", time: "8 phút trước", severity: "low" },
    { id: 4, user: "Phạm Thị Dung", type: "distance", message: "Khoảng cách gần xe phía trước", time: "12 phút trước", severity: "high" },
    { id: 5, user: "Hoàng Văn Em", type: "weather", message: "Điều kiện thời tiết xấu", time: "15 phút trước", severity: "medium" },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'inactive': return 'secondary';
      case 'pending': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Quản lý hệ thống ADAS và người dùng</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Xuất báo cáo</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng người dùng</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12% so với tháng trước
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Người dùng hoạt động</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +8% so với tháng trước
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng phương tiện</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVehicles.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +15% so với tháng trước
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cảnh báo hôm nay</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.alertsToday}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="inline h-3 w-3 mr-1" />
              -5% so với hôm qua
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Quản lý người dùng</TabsTrigger>
          <TabsTrigger value="alerts">Cảnh báo & Sự cố</TabsTrigger>
          <TabsTrigger value="reports">Báo cáo</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Danh sách người dùng</CardTitle>
              <CardDescription>Quản lý tài khoản và thông tin người dùng</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm kiếm người dùng..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Lọc theo trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="active">Hoạt động</SelectItem>
                    <SelectItem value="inactive">Không hoạt động</SelectItem>
                    <SelectItem value="pending">Chờ duyệt</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Users Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên người dùng</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phương tiện</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Ngày tham gia</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.vehicle}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(user.status)}>
                          {user.status === 'active' ? 'Hoạt động' : 
                           user.status === 'inactive' ? 'Không hoạt động' : 'Chờ duyệt'}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(user.joinDate).toLocaleDateString('vi-VN')}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cảnh báo gần đây</CardTitle>
              <CardDescription>Theo dõi các cảnh báo và sự cố từ hệ thống ADAS</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Người dùng</TableHead>
                    <TableHead>Loại cảnh báo</TableHead>
                    <TableHead>Mô tả</TableHead>
                    <TableHead>Mức độ</TableHead>
                    <TableHead>Thời gian</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentAlerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell className="font-medium">{alert.user}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {alert.type === 'speed' ? 'Tốc độ' :
                           alert.type === 'lane' ? 'Làn đường' :
                           alert.type === 'obstacle' ? 'Vật cản' :
                           alert.type === 'distance' ? 'Khoảng cách' : 'Thời tiết'}
                        </Badge>
                      </TableCell>
                      <TableCell>{alert.message}</TableCell>
                      <TableCell>
                        <Badge variant={getSeverityColor(alert.severity)}>
                          {alert.severity === 'high' ? 'Cao' :
                           alert.severity === 'medium' ? 'Trung bình' : 'Thấp'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{alert.time}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Báo cáo sử dụng</CardTitle>
                <CardDescription>Thống kê hoạt động hệ thống</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Người dùng hoạt động hôm nay</span>
                    <span className="font-semibold">856</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Số lần sử dụng ADAS</span>
                    <span className="font-semibold">2,341</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tổng cảnh báo</span>
                    <span className="font-semibold">187</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tỷ lệ cảnh báo cao</span>
                    <span className="font-semibold text-red-600">12.3%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Báo cáo an toàn</CardTitle>
                <CardDescription>Phân tích mức độ an toàn</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Điểm an toàn trung bình</span>
                    <span className="font-semibold text-green-600">8.7/10</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Số vụ tai nạn tránh được</span>
                    <span className="font-semibold">23</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Cải thiện hành vi lái xe</span>
                    <span className="font-semibold text-green-600">+15%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tuân thủ luật giao thông</span>
                    <span className="font-semibold text-green-600">87%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}