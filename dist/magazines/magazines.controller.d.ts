import { Magazine } from './magazine.entity';
import { CreateMagazineDto, UpdateMagazineDto } from './magazine.dto';
import { MagazinesService } from './magazines.service';
export declare class MagazinesController {
    private readonly magazinesService;
    constructor(magazinesService: MagazinesService);
    findAll(): Promise<Magazine[]>;
    findById(id: number): Promise<Magazine>;
    create(createMagazineDto: CreateMagazineDto): Promise<Magazine>;
    update(id: number, updateMagazineDto: UpdateMagazineDto): Promise<Magazine>;
    softDelete(id: number): Promise<void>;
}
