import { IsOptional } from 'class-validator';

export class UpdateCurrentlyDrugDto {
  @IsOptional()
  caution?: string;

  @IsOptional()
  receiveDate?: Date;

  @IsOptional()
  receivePlace?: string;

  @IsOptional()
  more?: string;

  @IsOptional()
  alertStatus?: boolean;

  // ถ้าไม่เตือนค่าข้างล่างไม่มี ต้องทำไง

  // @IsOptional()
  // tabs?: number;

  // หอยหลอด enum กำหนดค่ายังไง registerEnum เหี้ยไรนิ
  // @IsEnum()
  // take: Enumerator;

  // @IsEnum()
  // time: Enumerator;

  // @IsOptional()
  // everyHour?: number;
}
