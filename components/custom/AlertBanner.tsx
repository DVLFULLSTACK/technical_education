import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Rocket, TriangleAlert } from "lucide-react";

interface AlertBannerProps {
  isCompleted: boolean;
  requiredFieldsCount: number;
  missingFieldsCount: number;
}

const AlertBanner = ({
  isCompleted,
  requiredFieldsCount,
  missingFieldsCount,
}: AlertBannerProps) => {
  return (
    <Alert
      className="my-4"
      variant={`${isCompleted ? "complete" : "destructive"}`}
    >
      {isCompleted ? (
        <Rocket className="h-4 w-4" />
      ) : (
        <TriangleAlert className="h-4 w-4" />
      )}
      <AlertTitle className="text-xs font-medium">
        {missingFieldsCount} missing field(s) / {requiredFieldsCount} trường bắt buộc
      </AlertTitle>
      <AlertDescription className="text-xs">
        {isCompleted
          ? "Tuyệt vời! Khóa học đã sẵn sàng để xuất bản"
          : "Bạn chỉ có thể xuất bản khi tất cả các trường bắt buộc đã được hoàn thành"}
      </AlertDescription>
    </Alert>
  );
};

export default AlertBanner;
