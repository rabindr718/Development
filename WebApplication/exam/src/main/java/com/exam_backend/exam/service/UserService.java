package com.exam_backend.exam.service;

import com.exam_backend.exam.Models.User;
import com.exam_backend.exam.Models.UserRole;

import java.util.Set;

public interface UserService {
    public User createUser(User user, Set<UserRole> userRoles) throws Exception;
}
