export var UserManagement;
(function (UserManagement) {
    let Admin;
    (function (Admin) {
        class AdminUser {
            name;
            email;
            isSuperAdmin;
            constructor(name, email, isSuperAdmin = false) {
                this.name = name;
                this.email = email;
                this.isSuperAdmin = isSuperAdmin;
            }
            setSuperAdmin(status) {
                this.isSuperAdmin = status;
            }
            getInfo() {
                return `Admin: ${this.name} (${this.email}) | SuperAdmin: ${this.isSuperAdmin}`;
            }
        }
        Admin.AdminUser = AdminUser;
    })(Admin = UserManagement.Admin || (UserManagement.Admin = {}));
})(UserManagement || (UserManagement = {}));
