import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DetectionData } from "./AdasDashboard";
import { 
  Gauge, 
  Navigation, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap
} from "lucide-react";

interface StatusPanelProps {
  detectionData: DetectionData;
  isActive: boolean;
}

export const StatusPanel = ({ detectionData, isActive }: StatusPanelProps) => {
  const { speed, lanePosition, obstacles, alerts } = detectionData;

  const formatTime = () => {
    return new Date().toLocaleTimeString('vi-VN', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <Card className="dashboard-panel">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Gauge className="w-5 h-5" />
          Detection Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        {/* Current Time */}
        <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Time</span>
          </div>
          <span className="font-mono text-sm">{formatTime()}</span>
        </div>

        {!isActive ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">⏸️</div>
            <p className="text-sm text-muted-foreground">
              ADAS system is in standby mode
            </p>
          </div>
        ) : (
          <>
            {/* Speed Status */}
            <div>
              <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Speed Analysis
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Current Speed</span>
                  <span className={`font-mono font-bold ${
                    speed > 50 ? "text-speed-warning" : "text-speed-normal"
                  }`}>
                    {speed} km/h
                  </span>
                </div>
                <div className="w-full bg-secondary/30 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      speed > 50 ? "bg-speed-warning" : "bg-speed-normal"
                    }`}
                    style={{ width: `${Math.min((speed / 60) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Lane Position */}
            <div>
              <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <Navigation className="w-4 h-4" />
                Lane Position
              </h3>
              <div className="flex items-center justify-center gap-1 p-3 bg-secondary/30 rounded-lg">
                <div className={`w-6 h-6 rounded border-2 flex items-center justify-center text-xs ${
                  lanePosition === "left" 
                    ? "border-warning bg-warning/20 text-warning" 
                    : "border-muted/30"
                }`}>
                  L
                </div>
                <div className={`w-6 h-6 rounded border-2 flex items-center justify-center text-xs ${
                  lanePosition === "center" 
                    ? "border-speed-normal bg-speed-normal/20 text-speed-normal" 
                    : "border-muted/30"
                }`}>
                  C
                </div>
                <div className={`w-6 h-6 rounded border-2 flex items-center justify-center text-xs ${
                  lanePosition === "right" 
                    ? "border-warning bg-warning/20 text-warning" 
                    : "border-muted/30"
                }`}>
                  R
                </div>
              </div>
            </div>

            {/* Obstacle Detection */}
            <div>
              <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Obstacles
              </h3>
              {obstacles.length > 0 ? (
                <div className="space-y-2">
                  {obstacles.map((obstacle, index) => (
                    <div key={index} className="p-2 bg-destructive/10 border border-destructive/30 rounded">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-destructive">
                          {obstacle.type.toUpperCase()}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {Math.floor(Math.random() * 20 + 5)}m
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-2 p-2 bg-speed-normal/10 border border-speed-normal/30 rounded">
                  <CheckCircle className="w-4 h-4 text-speed-normal" />
                  <span className="text-sm text-speed-normal">Clear path</span>
                </div>
              )}
            </div>

            {/* Active Alerts */}
            <div>
              <h3 className="text-sm font-semibold mb-2">System Alerts</h3>
              {alerts.length > 0 ? (
                <div className="space-y-2">
                  {alerts.map((alert, index) => (
                    <div key={index} className="p-2 bg-warning/10 border border-warning/30 rounded">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-warning" />
                        <span className="text-sm text-warning font-medium">{alert}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-2 p-2 bg-speed-normal/10 border border-speed-normal/30 rounded">
                  <CheckCircle className="w-4 h-4 text-speed-normal" />
                  <span className="text-sm text-speed-normal">All systems normal</span>
                </div>
              )}
            </div>

            {/* Statistics */}
            <div className="pt-4 border-t border-border">
              <h3 className="text-sm font-semibold mb-2">Session Stats</h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-center p-2 bg-secondary/30 rounded">
                  <div className="font-mono font-bold">{Math.floor(Math.random() * 300 + 100)}</div>
                  <div className="text-muted-foreground">Detections</div>
                </div>
                <div className="text-center p-2 bg-secondary/30 rounded">
                  <div className="font-mono font-bold">{Math.floor(Math.random() * 10 + 5)}</div>
                  <div className="text-muted-foreground">Alerts</div>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};