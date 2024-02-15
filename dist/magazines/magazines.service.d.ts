import { Repository, UpdateResult } from 'typeorm';
import { Magazine } from './magazine.entity';
import { CreateMagazineDto, UpdateMagazineDto } from './magazine.dto';
export declare class MagazinesService {
    private readonly magazineRepository;
    constructor(magazineRepository: Repository<Magazine>);
    findById(id: number): Promise<Magazine | undefined>;
    findAll(): Promise<Magazine[]>;
    create(createMagazineDto: CreateMagazineDto): Promise<Magazine>;
    softDelete(id: number): Promise<UpdateResult>;
    update(id: number, updateMagazineDto: UpdateMagazineDto): Promise<Magazine>;
}
