import { useState, useRef } from "react";
import { VideoFeed } from "./VideoFeed";
import { HudOverlay } from "./HudOverlay";
import { ControlPanel } from "./ControlPanel";
import { StatusPanel } from "./StatusPanel";

export type InputMode = "camera" | "upload" | "none";

export interface DetectionData {
  speed: number;
  lanePosition: "center" | "left" | "right";
  obstacles: Array<{ x: number; y: number; width: number; height: number; type: string }>;
  alerts: string[];
}

export const AdasDashboard = () => {
  const [inputMode, setInputMode] = useState<InputMode>("none");
  const [isActive, setIsActive] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [detectionData, setDetectionData] = useState<DetectionData>({
    speed: 0,
    lanePosition: "center",
    obstacles: [],
    alerts: []
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleModeChange = (mode: InputMode) => {
    setInputMode(mode);
    setIsActive(false);
    setVideoFile(null);
  };

  const handleFileUpload = (file: File) => {
    setVideoFile(file);
    setInputMode("upload");
  };

  const handleStartStop = () => {
    setIsActive(!isActive);
    
    if (!isActive && inputMode !== "none") {
      // Simulate ADAS detection with mock data
      const simulateDetection = () => {
        setDetectionData({
          speed: Math.floor(Math.random() * 60) + 30,
          lanePosition: Math.random() > 0.7 ? "left" : Math.random() > 0.7 ? "right" : "center",
          obstacles: Math.random() > 0.6 ? [
            {
              x: Math.random() * 400 + 200,
              y: Math.random() * 200 + 300,
              width: 80 + Math.random() * 40,
              height: 60 + Math.random() * 30,
              type: "vehicle"
            }
          ] : [],
          alerts: Math.random() > 0.8 ? ["Lane Departure Warning"] : 
                 Math.random() > 0.9 ? ["Forward Collision Warning"] : []
        });
      };

      // Update detection data every 500ms when active
      const interval = setInterval(() => {
        if (isActive) {
          simulateDetection();
        } else {
          clearInterval(interval);
        }
      }, 500);

      simulateDetection(); // Initial detection
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary flex items-center gap-3">
              🏍️ ADAS Motorcycle Assistant
            </h1>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full animate-pulse ${
                isActive ? "bg-speed-normal" : "bg-muted"
              }`} />
              <span className="text-sm font-mono">
                {isActive ? "ACTIVE" : "STANDBY"}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 h-[calc(100vh-140px)]">
          
          {/* Video Feed Area */}
          <div className="xl:col-span-3 relative">
            <div className="video-container h-full min-h-[400px] bg-card rounded-lg border border-border">
              <VideoFeed
                ref={videoRef}
                mode={inputMode}
                videoFile={videoFile}
                isActive={isActive}
                onLoadedMetadata={() => {
                  console.log("Video loaded");
                }}
              />
              
              {isActive && (
                <HudOverlay
                  detectionData={detectionData}
                  canvasRef={canvasRef}
                />
              )}
            </div>
          </div>

          {/* Control Panels */}
          <div className="flex flex-col gap-6">
            <ControlPanel
              currentMode={inputMode}
              isActive={isActive}
              onModeChange={handleModeChange}
              onFileUpload={handleFileUpload}
              onStartStop={handleStartStop}
            />
            
            <StatusPanel
              detectionData={detectionData}
              isActive={isActive}
            />
          </div>
        </div>
      </div>
    </div>
  );
};