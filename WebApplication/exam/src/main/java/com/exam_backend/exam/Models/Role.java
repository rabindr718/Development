package com.exam_backend.exam.Models;
import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="roles")
public class Role {
    public Long getRoleId() {
        return roleId;
    }

    public Role(Long roleId, String roleName, Set<UserRole> userRoles) {
        this.roleId = roleId;
        this.roleName = roleName;
        this.userRoles = userRoles;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    @Id
    @Column(name = "role_id")

    private Long roleId;
    private String roleName;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "role")
    private Set<UserRole> userRoles=new HashSet<>();

    public Role() {
    }


    public Set<UserRole> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(Set<UserRole> userRoles) {
        this.userRoles = userRoles;
    }




    public String getRollName() {
        return roleName;
    }

    public void setRollName(String roleName) {
        this.roleName = roleName;
    }
}
