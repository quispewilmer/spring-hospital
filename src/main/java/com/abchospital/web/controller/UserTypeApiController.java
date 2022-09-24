package com.abchospital.web.controller;

import com.abchospital.web.model.UserType;
import com.abchospital.web.service.UserTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping(value = "/api")
public class UserTypeApiController {
    @Autowired
    private UserTypeService userTypeService;

    @ResponseBody
    @RequestMapping(value = "/user-type/", method = RequestMethod.GET)
    public List<UserType> getUserTypes() {
        return userTypeService.findAll();
    }
}
