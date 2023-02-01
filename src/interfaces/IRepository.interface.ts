interface IRepository<T> {
    create(dto: Object): Promise<T>;
    update(dto: Object): Promise<T>;
    deleteById(id: string | number): void;
    findById(id: string | number): Promise<T>;
	getAll(): Promise<T[]>
}
