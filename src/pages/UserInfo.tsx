import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Edit, Save, X, Phone, Mail, MapPin, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function UserInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  
  const [userData, setUserData] = useState({
    fullName: "Nguyễn Văn An",
    email: "nguyenvanan@email.com",
    phone: "0901234567",
    address: "123 Lê Lợi, Quận 1, TP.HCM",
    birthDate: "1990-05-15",
    licenseNumber: "B1 123456789",
    licenseExpiry: "2025-05-15",
    licenseClass: "A2",
    emergencyContact: "Nguyễn Thị Bình - 0987654321",
    joinDate: "2023-01-15"
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Đã lưu thông tin",
      description: "Thông tin người dùng đã được cập nhật thành công.",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data here if needed
  };

  const handleInputChange = (field: string, value: string) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const isLicenseExpiringSoon = (expiryDate: string): boolean => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  };

  const isLicenseExpired = (expiryDate: string): boolean => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    return expiry < today;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Thông tin người dùng</h1>
          <p className="text-muted-foreground">Quản lý thông tin cá nhân và giấy phép lái xe</p>
        </div>
        <div className="flex space-x-2">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} className="flex items-center space-x-2">
              <Edit className="h-4 w-4" />
              <span>Chỉnh sửa</span>
            </Button>
          ) : (
            <>
              <Button onClick={handleSave} className="flex items-center space-x-2">
                <Save className="h-4 w-4" />
                <span>Lưu</span>
              </Button>
              <Button variant="outline" onClick={handleCancel} className="flex items-center space-x-2">
                <X className="h-4 w-4" />
                <span>Hủy</span>
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Profile */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Hồ sơ cá nhân</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src="" alt={userData.fullName} />
                <AvatarFallback className="text-2xl">
                  {userData.fullName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold">{userData.fullName}</h3>
              <p className="text-muted-foreground">{calculateAge(userData.birthDate)} tuổi</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{userData.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{userData.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{userData.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Tham gia từ {new Date(userData.joinDate).toLocaleDateString('vi-VN')}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Thông tin chi tiết</CardTitle>
            <CardDescription>Thông tin cá nhân và liên hệ</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Họ và tên</Label>
                {isEditing ? (
                  <Input
                    id="fullName"
                    value={userData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                  />
                ) : (
                  <p className="px-3 py-2 bg-muted rounded-md">{userData.fullName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={userData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                ) : (
                  <p className="px-3 py-2 bg-muted rounded-md">{userData.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Số điện thoại</Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    value={userData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                ) : (
                  <p className="px-3 py-2 bg-muted rounded-md">{userData.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthDate">Ngày sinh</Label>
                {isEditing ? (
                  <Input
                    id="birthDate"
                    type="date"
                    value={userData.birthDate}
                    onChange={(e) => handleInputChange('birthDate', e.target.value)}
                  />
                ) : (
                  <p className="px-3 py-2 bg-muted rounded-md">{new Date(userData.birthDate).toLocaleDateString('vi-VN')}</p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Địa chỉ</Label>
                {isEditing ? (
                  <Input
                    id="address"
                    value={userData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                  />
                ) : (
                  <p className="px-3 py-2 bg-muted rounded-md">{userData.address}</p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="emergencyContact">Liên hệ khẩn cấp</Label>
                {isEditing ? (
                  <Input
                    id="emergencyContact"
                    value={userData.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  />
                ) : (
                  <p className="px-3 py-2 bg-muted rounded-md">{userData.emergencyContact}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* License Information */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Thông tin giấy phép lái xe</CardTitle>
            <CardDescription>Chi tiết về giấy phép lái xe hiện tại</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="licenseNumber">Số giấy phép</Label>
                {isEditing ? (
                  <Input
                    id="licenseNumber"
                    value={userData.licenseNumber}
                    onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                  />
                ) : (
                  <p className="px-3 py-2 bg-muted rounded-md">{userData.licenseNumber}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="licenseClass">Hạng giấy phép</Label>
                {isEditing ? (
                  <Select value={userData.licenseClass} onValueChange={(value) => handleInputChange('licenseClass', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A1">A1 - Xe máy dưới 175cc</SelectItem>
                      <SelectItem value="A2">A2 - Xe máy trên 175cc</SelectItem>
                      <SelectItem value="A3">A3 - Xe máy ba bánh</SelectItem>
                      <SelectItem value="B1">B1 - Ô tô dưới 9 chỗ</SelectItem>
                      <SelectItem value="B2">B2 - Ô tô trên 9 chỗ</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{userData.licenseClass}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {userData.licenseClass === 'A2' && 'Xe máy trên 175cc'}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="licenseExpiry">Ngày hết hạn</Label>
                {isEditing ? (
                  <Input
                    id="licenseExpiry"
                    type="date"
                    value={userData.licenseExpiry}
                    onChange={(e) => handleInputChange('licenseExpiry', e.target.value)}
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <p className="px-3 py-2 bg-muted rounded-md">
                      {new Date(userData.licenseExpiry).toLocaleDateString('vi-VN')}
                    </p>
                    {isLicenseExpired(userData.licenseExpiry) && (
                      <Badge variant="destructive">Hết hạn</Badge>
                    )}
                    {isLicenseExpiringSoon(userData.licenseExpiry) && !isLicenseExpired(userData.licenseExpiry) && (
                      <Badge variant="secondary">Sắp hết hạn</Badge>
                    )}
                  </div>
                )}
              </div>
            </div>

            {(isLicenseExpired(userData.licenseExpiry) || isLicenseExpiringSoon(userData.licenseExpiry)) && (
              <div className="mt-4 p-4 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg">
                <p className="text-sm text-orange-800 dark:text-orange-200">
                  {isLicenseExpired(userData.licenseExpiry) 
                    ? "⚠️ Giấy phép lái xe đã hết hạn. Vui lòng gia hạn để tiếp tục sử dụng." 
                    : "⚠️ Giấy phép lái xe sẽ hết hạn trong 30 ngày tới. Vui lòng chuẩn bị gia hạn."
                  }
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}