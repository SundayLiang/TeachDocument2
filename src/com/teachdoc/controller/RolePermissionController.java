package com.teachdoc.controller;

import java.util.ArrayList;
import java.util.List;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;

import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Record;
import com.teachdoc.dao.RolePermission;

public class RolePermissionController extends Controller{
	Subject subject = SecurityUtils.getSubject();
	
	/*
	 * 是否拥有此角色
	 */
	public void hasRole(){
		String role=getPara("role");
		if(null!=role && role.length()>0){
			renderJson(subject.hasRole(role));
			return ;
		}
		renderJson(false);
		return;
	}
	
	/*
	 * 是否拥有此权限
	 */
	
	public void hasPermission(){
		String permission=getPara("permission");
		if(null!=permission && permission.length()>0){
			renderJson(subject.isPermitted(permission));
			return ;
		}
		renderJson(false);
		return;
	}
	
	public void hasRoles(){
		renderJson(false);
	}
	
	public void hasPermissions(){
		renderJson(false);
	}
	
	public void hasAnyroles(){
		renderJson(false);
	}
	public void hasAnyPermissions(){
		String permissions=getPara("permissions");
		String list[] = permissions.split("、");
		for(int i=0; i<list.length; i++){
			if(subject.isPermitted(list[i])){
				System.out.println("I am in!");
				renderJson(1);
				return;
			}
		}
		renderJson(0);
	}
	//---------------------------------------------------new---------------------------------------------------
	public void searchRole(){
		List<Record> list=RolePermission.dao.searchRole();
		renderJson(list);
	}
	
	public void searchPermission(){
		List<Record> list = RolePermission.dao.searchPerm();
		renderJson(list);
	}
}
