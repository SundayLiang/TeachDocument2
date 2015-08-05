package com.teachdoc.dao;

import java.util.List;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Model;

public class RolePermission extends Model<RolePermission>{
	public static final RolePermission dao = new RolePermission();
	
	public List searchRole(){
		String sql="select * from role";
		return Db.find(sql);
	}

	public List searchPerm(){
		String sql="select * from permission";
		return Db.find(sql);
	}
}
