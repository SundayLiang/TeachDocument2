package com.teachdoc.controller;

import java.util.List;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;

import com.jfinal.core.Controller;
import com.teachdoc.dao.InvigilateTeacher;

public class InvigilateTeacherController extends Controller {
	public void doIt(int login_account){
		List tl1 = InvigilateTeacher.dao.searchLabByID(login_account);
		int ti = Integer.parseInt(tl1.toString());
		List tl2 = InvigilateTeacher.dao.searchLabNum(ti);
	}
	
	public void searchTest(){
		Subject subject = SecurityUtils.getSubject();
		Session session = subject.getSession();
		String login_account=(String)session.getAttribute("login_account");
		
	}
}
