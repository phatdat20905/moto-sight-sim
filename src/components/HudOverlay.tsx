import { RefObject } from "react";
import { DetectionData } from "./AdasDashboard";

interface HudOverlayProps {
  detectionData: DetectionData;
  canvasRef: RefObject<HTMLCanvasElement>;
}

export const HudOverlay = ({ detectionData }: HudOverlayProps) => {
  const { speed, lanePosition, obstacles, alerts } = detectionData;

  return (
    <div className="detection-overlay">
      
      {/* Lane Position Indicator */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
        <div className="hud-overlay px-6 py-3 rounded-lg">
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">LANE POSITION</div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${
                lanePosition === "left" ? "bg-warning" : "bg-muted/30"
              }`} />
              <div className={`w-3 h-3 rounded-full ${
                lanePosition === "center" ? "bg-speed-normal" : "bg-muted/30"
              }`} />
              <div className={`w-3 h-3 rounded-full ${
                lanePosition === "right" ? "bg-warning" : "bg-muted/30"
              }`} />
            </div>
          </div>
        </div>
      </div>

      {/* Speed Display */}
      <div className="absolute top-6 right-6">
        <div className="hud-overlay p-4 rounded-lg text-right">
          <div className="text-xs text-muted-foreground">SPEED</div>
          <div className={`text-3xl font-mono font-bold ${
            speed > 50 ? "speed-warning" : "speed-indicator"
          }`}>
            {speed}
          </div>
          <div className="text-xs text-muted-foreground">km/h</div>
        </div>
      </div>

      {/* Lane Departure Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Left Lane */}
        <line 
          x1="25%" 
          y1="100%" 
          x2="35%" 
          y2="60%" 
          className="lane-marker"
        />
        
        {/* Right Lane */}
        <line 
          x1="75%" 
          y1="100%" 
          x2="65%" 
          y2="60%" 
          className="lane-marker"
        />

        {/* Center Dashed Lines */}
        <g className="lane-marker">
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={i}
              x1="50%"
              y1={`${100 - i * 12}%`}
              x2="50%"
              y2={`${95 - i * 12}%`}
              strokeWidth="2"
            />
          ))}
        </g>
      </svg>

      {/* Obstacle Detection */}
      {obstacles.map((obstacle, index) => (
        <div
          key={index}
          className="absolute border-2 border-obstacle-alert bg-obstacle-alert/10 rounded"
          style={{
            left: obstacle.x,
            top: obstacle.y,
            width: obstacle.width,
            height: obstacle.height,
          }}
        >
          <div className="absolute -top-6 left-0 text-xs bg-obstacle-alert text-white px-2 py-1 rounded">
            {obstacle.type.toUpperCase()}
          </div>
        </div>
      ))}

      {/* Distance Grid */}
      <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2">
        <div className="space-y-2">
          {[10, 20, 30].map((distance) => (
            <div key={distance} className="flex items-center gap-4 text-xs text-primary/60 font-mono">
              <div className="w-8 h-0.5 bg-primary/40" />
              <span>{distance}m</span>
              <div className="w-8 h-0.5 bg-primary/40" />
            </div>
          ))}
        </div>
      </div>

      {/* Active Alerts */}
      {alerts.length > 0 && (
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2">
          <div className="alert-overlay px-6 py-3 rounded-lg text-center">
            <div className="font-bold text-destructive-foreground">
              ⚠️ {alerts[0]}
            </div>
          </div>
        </div>
      )}

      {/* Compass */}
      <div className="absolute top-6 left-6">
        <div className="hud-overlay p-3 rounded-lg">
          <div className="w-12 h-12 relative">
            <div className="absolute inset-0 border-2 border-primary/30 rounded-full" />
            <div className="absolute top-1 left-1/2 w-0.5 h-4 bg-primary transform -translate-x-1/2" />
            <div className="text-xs text-center mt-1 text-primary">N</div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="absolute bottom-6 left-6">
        <div className="hud-overlay px-4 py-2 rounded-lg">
          <div className="flex items-center gap-2 text-xs font-mono">
            <div className="w-2 h-2 bg-speed-normal rounded-full animate-pulse" />
            <span>ADAS ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
};