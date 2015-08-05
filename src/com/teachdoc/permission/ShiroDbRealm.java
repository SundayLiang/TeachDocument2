package com.teachdoc.permission;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;

import com.google.gson.Gson;
import com.teachdoc.dao.User;

public class ShiroDbRealm extends AuthorizingRealm{
	
	private User user = new User();
	private Gson gson = new Gson();

	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection collection) {
		String login_account = (String) collection.fromRealm(getName()).iterator().next();
		
		SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();

		HashMap<String, String> map = user.userRole(login_account);
		String role = map.get("role");
		String permission = map.get("permissions");
		String upermission = map.get("permission");
		info.addRole(role);
		String list[] = permission.split("、");
		
		
		List<String> array=new ArrayList<String>();

		if ("超级管理员".equals(role) ) {
			System.out.println("admin login");
			for(int i=0;i<100;i++)
				array.add(String.valueOf(i));
		}else{
			if(upermission!=null){
				String ulist[] = upermission.split("、");
				for (int i=0; i<ulist.length; i++){
					array.add(ulist[i]);
				}
			}
			System.out.println("user login");
			for(int i=0;i<list.length;i++)
				array.add(list[i]);
		}
		info.addStringPermissions(array);
		return info;
	}

	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
		UsernamePasswordToken token = (UsernamePasswordToken) authenticationToken;
		boolean bool = user.login(token.getUsername(),new String(token.getPassword()));
		System.out.println(bool);
		if (bool) {
			return new SimpleAuthenticationInfo(token.getUsername(), token.getPassword(), getName());
		}
		else {
			return null;
		}

	}
}
