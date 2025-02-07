import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardRegistroPontoProps } from "./interfaces";

export function CardRegistroPonto({
  cardTitle,
  cardContent,
  cardFooter,
}: CardRegistroPontoProps) {
  return (
    <Card className="w-[887px] h-[500px] place-content-center rounded-[30px]">
      <CardHeader className="items-center">
        <CardTitle className="text-4xl">{cardTitle}</CardTitle>
      </CardHeader>
      <CardContent>{cardContent}</CardContent>
      <CardFooter className="flex justify-center">{cardFooter}</CardFooter>
    </Card>
  );
}
