import { forwardRef, useEffect, useRef, useState } from "react";
import { InputMode } from "./AdasDashboard";
import { Button } from "@/components/ui/button";
import { Upload, Camera, AlertCircle } from "lucide-react";

interface VideoFeedProps {
  mode: InputMode;
  videoFile: File | null;
  isActive: boolean;
  onLoadedMetadata: () => void;
}

export const VideoFeed = forwardRef<HTMLVideoElement, VideoFeedProps>(
  ({ mode, videoFile, isActive, onLoadedMetadata }, ref) => {
    const streamRef = useRef<MediaStream | null>(null);
    const [error, setError] = useState<string>("");
    const [cameraPermission, setCameraPermission] = useState<"granted" | "denied" | "prompt">("prompt");

    // Initialize camera stream
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: "environment" // Rear camera on mobile
          },
          audio: false
        });
        
        streamRef.current = stream;
        setCameraPermission("granted");
        
        if (ref && typeof ref !== "function" && ref.current) {
          ref.current.srcObject = stream;
          ref.current.play();
        }
        
        setError("");
      } catch (err) {
        console.error("Camera access error:", err);
        setCameraPermission("denied");
        setError("Camera access denied or not available");
      }
    };

    // Stop camera stream
    const stopCamera = () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      if (ref && typeof ref !== "function" && ref.current) {
        ref.current.srcObject = null;
      }
    };

    // Handle video file
    useEffect(() => {
      if (mode === "upload" && videoFile && ref && typeof ref !== "function" && ref.current) {
        const url = URL.createObjectURL(videoFile);
        ref.current.src = url;
        ref.current.onloadedmetadata = onLoadedMetadata;
        
        return () => URL.revokeObjectURL(url);
      }
    }, [mode, videoFile, ref, onLoadedMetadata]);

    // Handle camera mode
    useEffect(() => {
      if (mode === "camera") {
        startCamera();
      } else {
        stopCamera();
      }

      return () => stopCamera();
    }, [mode]);

    // Cleanup on unmount
    useEffect(() => {
      return () => stopCamera();
    }, []);

    if (mode === "none") {
      return (
        <div className="h-full flex flex-col items-center justify-center text-center p-8">
          <div className="space-y-6">
            <div className="text-6xl mb-4">🏍️</div>
            <h3 className="text-2xl font-bold text-primary">ADAS Ready</h3>
            <p className="text-muted-foreground max-w-md">
              Select camera input or upload a video file to begin motorcycle 
              Advanced Driver Assistance System simulation
            </p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="h-full flex flex-col items-center justify-center text-center p-8">
          <AlertCircle className="w-16 h-16 text-destructive mb-4" />
          <h3 className="text-xl font-semibold text-destructive mb-2">Error</h3>
          <p className="text-muted-foreground">{error}</p>
        </div>
      );
    }

    return (
      <div className="h-full relative overflow-hidden rounded-lg">
        <video
          ref={ref}
          className="camera-feed w-full h-full object-cover"
          autoPlay={mode === "camera"}
          controls={mode === "upload"}
          muted
          playsInline
        />
        
        {/* Processing Overlay */}
        {isActive && (
          <div className="detection-overlay">
            {/* Scanning Animation */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan-detect opacity-60" />
            
            {/* Corner Markers */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary" />
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary" />
            
            {/* Center Target */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-4 h-4 border border-primary rounded-full animate-pulse-hud" />
            </div>
          </div>
        )}

        {/* Mode Indicator */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
          <div className="hud-overlay px-4 py-2 rounded-full">
            <div className="flex items-center gap-2 text-sm font-mono">
              {mode === "camera" ? (
                <>
                  <Camera className="w-4 h-4" />
                  Live Camera
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Video File
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

VideoFeed.displayName = "VideoFeed";