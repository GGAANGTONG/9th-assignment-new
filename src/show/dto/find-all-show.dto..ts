import { IsOptional, IsEnum, IsString } from "class-validator";
import { ShowCategory } from "../types/show_category.types";

export class FindAllShowDto {

  /**
   * 키워드
   * @example "국밥"
   */
  @IsOptional()
  @IsString()
  keyword?: string;

  /**
   * 카테고리
   * @example "Concert"
   */
  @IsOptional()
  @IsEnum(ShowCategory)
  category?:ShowCategory;
  
}
