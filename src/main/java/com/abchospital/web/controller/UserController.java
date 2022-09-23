package com.abchospital.web.controller;

import com.abchospital.web.model.User;
import com.abchospital.web.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@Controller
@RequestMapping(value = "/user", method = RequestMethod.GET)
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping(value = "/home", method = RequestMethod.GET)
    public String showIndex(Model model) {
        List<User> userList = userService.findAll();

        model.addAttribute("userList", userList);

        return "userIndex";
    }
}
