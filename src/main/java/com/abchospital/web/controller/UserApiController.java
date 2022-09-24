package com.abchospital.web.controller;

import com.abchospital.web.model.User;
import com.abchospital.web.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.List;
import java.util.function.Consumer;

@Controller
@RequestMapping(value = "/api")
public class UserApiController {
    @Autowired
    private UserService userService;

    @ResponseBody
    @RequestMapping(value = "/user/", method = RequestMethod.GET)
    public List<User> getUsers() {
        return userService.findAll();
    }

    @ResponseBody
    @RequestMapping(value = "/user/{id}", method = RequestMethod.GET)
    public User getUsers(@PathVariable("id") Integer id) {
        return userService.findById(id);
    }

    @ResponseBody
    @RequestMapping(value = "/user/", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public User saveUser(@RequestBody User user) {
        return userService.save(user);
    }

    @ResponseBody
    @RequestMapping(value = "/user/{id}", method = RequestMethod.DELETE)
    public void deleteUser(@PathVariable("id") Integer id) {
        userService.deleteById(id);
    }
}
