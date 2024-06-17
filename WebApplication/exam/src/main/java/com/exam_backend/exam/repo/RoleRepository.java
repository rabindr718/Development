package com.exam_backend.exam.repo;

import com.exam_backend.exam.Models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    public Role findUserByroleName(String rollName);
}
