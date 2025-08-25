import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InputMode } from "./AdasDashboard";
import { 
  Camera, 
  Upload, 
  Play, 
  Square,
  Video,
  Settings,
  Shield,
  Target
} from "lucide-react";

interface ControlPanelProps {
  currentMode: InputMode;
  isActive: boolean;
  onModeChange: (mode: InputMode) => void;
  onFileUpload: (file: File) => void;
  onStartStop: () => void;
}

export const ControlPanel = ({
  currentMode,
  isActive,
  onModeChange,
  onFileUpload,
  onStartStop
}: ControlPanelProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      onFileUpload(file);
    }
  };

  return (
    <Card className="dashboard-panel">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Settings className="w-5 h-5" />
          Control Center
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        {/* Input Mode Selection */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-foreground">Input Source</h3>
          <div className="grid grid-cols-1 gap-2">
            
            <Button
              variant={currentMode === "camera" ? "default" : "secondary"}
              onClick={() => onModeChange("camera")}
              disabled={isActive}
              className="justify-start"
            >
              <Camera className="w-4 h-4 mr-2" />
              Live Camera
            </Button>

            <Button
              variant={currentMode === "upload" ? "default" : "secondary"}
              onClick={() => fileInputRef.current?.click()}
              disabled={isActive}
              className="justify-start"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Video
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </div>

        {/* ADAS Controls */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-foreground">ADAS System</h3>
          
          <Button
            onClick={onStartStop}
            disabled={currentMode === "none"}
            variant={isActive ? "destructive" : "default"}
            className="w-full mb-3"
            size="lg"
          >
            {isActive ? (
              <>
                <Square className="w-4 h-4 mr-2" />
                Stop Detection
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Start Detection
              </>
            )}
          </Button>

          {/* Feature Toggles */}
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 border border-border rounded">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                <span className="text-sm">Lane Detection</span>
              </div>
              <div className={`w-2 h-2 rounded-full ${isActive ? "bg-speed-normal" : "bg-muted"}`} />
            </div>

            <div className="flex items-center justify-between p-2 border border-border rounded">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm">Collision Warning</span>
              </div>
              <div className={`w-2 h-2 rounded-full ${isActive ? "bg-speed-normal" : "bg-muted"}`} />
            </div>

            <div className="flex items-center justify-between p-2 border border-border rounded">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-primary" />
                <span className="text-sm">Object Tracking</span>
              </div>
              <div className={`w-2 h-2 rounded-full ${isActive ? "bg-speed-normal" : "bg-muted"}`} />
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">System Status</span>
            <span className={`font-mono ${isActive ? "text-speed-normal" : "text-muted-foreground"}`}>
              {isActive ? "RUNNING" : "STANDBY"}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-muted-foreground">Input Mode</span>
            <span className="font-mono text-primary capitalize">
              {currentMode === "none" ? "Not Selected" : currentMode}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};