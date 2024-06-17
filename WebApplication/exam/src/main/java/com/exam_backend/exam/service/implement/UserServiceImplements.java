package com.exam_backend.exam.service.implement;
import com.exam_backend.exam.Models.User;
import com.exam_backend.exam.Models.UserRole;
import com.exam_backend.exam.repo.RoleRepository;
import com.exam_backend.exam.repo.UserRepository;
import com.exam_backend.exam.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
@Service
public class UserServiceImplements implements UserService  {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    public UserServiceImplements(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    public UserRepository getUserRepository() {
        return userRepository;
    }

    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public RoleRepository getRoleRepository() {
        return roleRepository;
    }

    public void setRoleRepository(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public User createUser(User user, Set<UserRole> userRoles) throws Exception {

      User local=  this.userRepository.findByUsername(user.getUsername());
      if(local!=null){
          System.out.println("User is already there !! ");
          throw new Exception("User Already Presents ");
      }else{
          //create USER
          for(UserRole ur:userRoles){
              roleRepository.save(ur.getRole());
          }
          user.getUserRoles.addAll(userRoles);
          this.userRepository.save(user);
      }
        return local;
    }
}

