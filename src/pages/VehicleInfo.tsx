import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Car, Edit, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function VehicleInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  
  const [vehicleData, setVehicleData] = useState({
    brand: "Honda",
    model: "CBR 250R",
    year: "2023",
    licensePlate: "29A-12345",
    color: "Đỏ",
    engineCapacity: "250cc",
    fuelType: "Xăng",
    registrationDate: "2023-01-15",
    insurance: "Bảo Việt",
    insuranceExpiry: "2024-01-15",
    notes: "Xe trong tình trạng tốt, bảo dưỡng định kỳ"
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Đã lưu thông tin",
      description: "Thông tin xe đã được cập nhật thành công.",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data here if needed
  };

  const handleInputChange = (field: string, value: string) => {
    setVehicleData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Thông tin xe</h1>
          <p className="text-muted-foreground">Quản lý thông tin chi tiết về phương tiện</p>
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
        {/* Vehicle Overview */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Car className="h-5 w-5" />
              <span>Tổng quan xe</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
                <Car className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold">{vehicleData.brand} {vehicleData.model}</h3>
              <p className="text-muted-foreground">{vehicleData.licensePlate}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Năm sản xuất</span>
                <Badge variant="outline">{vehicleData.year}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Màu sắc</span>
                <Badge variant="outline">{vehicleData.color}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Dung tích</span>
                <Badge variant="outline">{vehicleData.engineCapacity}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vehicle Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Chi tiết xe</CardTitle>
            <CardDescription>Thông tin kỹ thuật và đăng ký</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="brand">Hãng xe</Label>
                {isEditing ? (
                  <Input
                    id="brand"
                    value={vehicleData.brand}
                    onChange={(e) => handleInputChange('brand', e.target.value)}
                  />
                ) : (
                  <p className="px-3 py-2 bg-muted rounded-md">{vehicleData.brand}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Mẫu xe</Label>
                {isEditing ? (
                  <Input
                    id="model"
                    value={vehicleData.model}
                    onChange={(e) => handleInputChange('model', e.target.value)}
                  />
                ) : (
                  <p className="px-3 py-2 bg-muted rounded-md">{vehicleData.model}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Năm sản xuất</Label>
                {isEditing ? (
                  <Select value={vehicleData.year} onValueChange={(value) => handleInputChange('year', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 20 }, (_, i) => 2024 - i).map(year => (
                        <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="px-3 py-2 bg-muted rounded-md">{vehicleData.year}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="licensePlate">Biển số xe</Label>
                {isEditing ? (
                  <Input
                    id="licensePlate"
                    value={vehicleData.licensePlate}
                    onChange={(e) => handleInputChange('licensePlate', e.target.value)}
                  />
                ) : (
                  <p className="px-3 py-2 bg-muted rounded-md">{vehicleData.licensePlate}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="color">Màu sắc</Label>
                {isEditing ? (
                  <Input
                    id="color"
                    value={vehicleData.color}
                    onChange={(e) => handleInputChange('color', e.target.value)}
                  />
                ) : (
                  <p className="px-3 py-2 bg-muted rounded-md">{vehicleData.color}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="engineCapacity">Dung tích động cơ</Label>
                {isEditing ? (
                  <Input
                    id="engineCapacity"
                    value={vehicleData.engineCapacity}
                    onChange={(e) => handleInputChange('engineCapacity', e.target.value)}
                  />
                ) : (
                  <p className="px-3 py-2 bg-muted rounded-md">{vehicleData.engineCapacity}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="fuelType">Loại nhiên liệu</Label>
                {isEditing ? (
                  <Select value={vehicleData.fuelType} onValueChange={(value) => handleInputChange('fuelType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Xăng">Xăng</SelectItem>
                      <SelectItem value="Điện">Điện</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="px-3 py-2 bg-muted rounded-md">{vehicleData.fuelType}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="registrationDate">Ngày đăng ký</Label>
                {isEditing ? (
                  <Input
                    id="registrationDate"
                    type="date"
                    value={vehicleData.registrationDate}
                    onChange={(e) => handleInputChange('registrationDate', e.target.value)}
                  />
                ) : (
                  <p className="px-3 py-2 bg-muted rounded-md">{new Date(vehicleData.registrationDate).toLocaleDateString('vi-VN')}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Thông tin bảo hiểm</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="insurance">Công ty bảo hiểm</Label>
                  {isEditing ? (
                    <Input
                      id="insurance"
                      value={vehicleData.insurance}
                      onChange={(e) => handleInputChange('insurance', e.target.value)}
                    />
                  ) : (
                    <p className="px-3 py-2 bg-muted rounded-md">{vehicleData.insurance}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="insuranceExpiry">Ngày hết hạn bảo hiểm</Label>
                  {isEditing ? (
                    <Input
                      id="insuranceExpiry"
                      type="date"
                      value={vehicleData.insuranceExpiry}
                      onChange={(e) => handleInputChange('insuranceExpiry', e.target.value)}
                    />
                  ) : (
                    <p className="px-3 py-2 bg-muted rounded-md">{new Date(vehicleData.insuranceExpiry).toLocaleDateString('vi-VN')}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Ghi chú</Label>
              {isEditing ? (
                <Textarea
                  id="notes"
                  value={vehicleData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  rows={3}
                />
              ) : (
                <p className="px-3 py-2 bg-muted rounded-md min-h-[80px]">{vehicleData.notes}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}