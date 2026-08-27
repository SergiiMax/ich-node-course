export namespace UserManagement {
    export namespace Admin {
        export class AdminUser {
            constructor(
                public name: string,
                public email: string,
                public isSuperAdmin: boolean = false
            ) {}

            setSuperAdmin(status: boolean): void {
                this.isSuperAdmin = status;
            }

            getInfo(): string {
                return `Admin: ${this.name} (${this.email}) | SuperAdmin: ${this.isSuperAdmin}`;
            }
        }
    }
}