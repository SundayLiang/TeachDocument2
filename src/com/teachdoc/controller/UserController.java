package com.teachdoc.controller;

import java.util.HashMap;
import java.util.List;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;

import com.google.gson.Gson;
import com.jfinal.aop.ClearInterceptor;
import com.jfinal.aop.ClearLayer;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Record;
import com.teachdoc.dao.User;
import com.teachdoc.dao.evaluateItemDao;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class UserController extends Controller{
	private Gson gson = new Gson();
//	@RequiresPermissions({"1","2"})
	public void login() throws Exception {
		String login_account = getPara("usernumber");
		String password = getPara("password");

		if(login_account==null || password==null || login_account=="" || password==""){
			renderJson(false);
			return;
		}
		Subject subject = SecurityUtils.getSubject();	
		UsernamePasswordToken token = new UsernamePasswordToken(login_account, password); 
		token.setRememberMe(true); 
		subject.login(token); 
		boolean bool;
		if (subject.isAuthenticated()){

			Session session = subject.getSession();
			Record record=User.dao.search(login_account).get(0);
			session.setAttribute("login_account", record.get("login_account"));
			bool=true;
		}
		else {
			bool=false;
		}
		renderJson(bool);
	}
	
	public void logout(){
		 Subject subject = SecurityUtils.getSubject();
		 subject.logout();
		 getRequest().getSession().invalidate();
		 redirect("/login.html");
	}
	
	public void userStatus(){
		Subject subject = SecurityUtils.getSubject();	
		Session session = subject.getSession();
		List<Record> list=User.dao.searchStatus((String)session.getAttribute("login_account"));
		renderJson(list);
	}
	
	//------------------------------------------------new-----------------------------------------
	public void search(){
		HashMap jsonMap=new HashMap();
		List<Record> list=User.dao.search(null);
		jsonMap.put("resultList", list);
		jsonMap.put("pageCount", User.dao.pageCount());
		
		String json = gson.toJson(jsonMap);
		renderJson(json);
	}
	
	public void delete(){
		String id=getPara("id");
		boolean flag=User.dao.delete(id);
		if (flag){
			renderText("yes");
		}
		else
			renderText("no");
	}
	
	public void update(){
		String id = getPara("id");
		if(User.dao.update("000", id)){
			renderText("yes");
		}
		else
			renderText("no");
	}
	public void insert(){
		String name=getPara("name");
		String login_account=getPara("login_account");
		String role=getPara("role");
		String permission=getPara("permission");
		String which_laboratory=getPara("laboratory");
		if(User.dao.insert(name, role, permission, login_account,which_laboratory)){
			renderText("yes");
		}
		else 
			renderText("no");
	}
	
	public void userRaP(){
		HashMap jsonMap=new HashMap();
		String login_account = getPara("userid");
		HashMap<String, String> map = User.dao.userRole(login_account);
		String role = map.get("role");
		String upermission = map.get("permission");
		if(upermission!=null){
		String ulist[] = upermission.split("、");
		jsonMap.put("list", ulist);
		}
		jsonMap.put("role", role);
		String json = gson.toJson(jsonMap);
		System.out.println(json);
		renderJson(json);
	}
	
	public void updateUserRole(){
		String userid=getPara("userid");
		String role=getPara("role");
		String[] permission = getParaValues("permission[]");
		String permissions="";
		if(permission!=null){
		
		for(int i=0; i<permission.length; i++){
		 permissions += permission[i]+"、";
		}
		 permissions=permissions.substring(0,permissions.length()-1);
		}
		
		if(User.dao.updateUserRole(userid, role, permissions)){
		   renderText("yes");
		}
		else
			renderText("no");
	}
	
	public void searchOne(){}
}
