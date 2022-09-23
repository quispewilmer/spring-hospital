package com.abchospital.web.service;

import com.abchospital.web.model.UserType;
import com.abchospital.web.repository.UserTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserTypeService {
    @Autowired
    private UserTypeRepository userTypeRepository;

    public List<UserType> findAll() {
        return userTypeRepository.findAll();
    }

}
