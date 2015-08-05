package com.teachdoc.dao;

import java.util.HashMap;
import java.util.List;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Record;

public class User extends Model<User> {
	public static final User dao=new User();
	private String passwordKey = "nop990*##lkj";// ������Կ

	public boolean login(String username, String password) {
		String sql = "SELECT COUNT(*) AS ct FROM user WHERE login_account=? AND password=?";//HEX(AES_ENCRYPT(?,?)
		List<Record> list = Db.find(sql.toString(), username, password);
		Record record = list.get(0);
		long count = record.getLong("ct");
		return count == 1 ? true : false;
	}
//------------------------------------------update-------------------------------------------
	public HashMap userRole(String username) {
		String sql = "select * from user u LEFT JOIN role r on r.id=u.role where login_account=?";
		List<Record> list = Db.find(sql.toString(), username);

		Record record = list.get(0);
		String role = record.get("role");
		String permission = record.getStr("permission");
		String permissions=record.get("permissions");
		HashMap map = new HashMap();
		map.put("permission", permission);
		map.put("role", role);
		map.put("permissions", permissions);
		return map;

	}
	
	//---------------------------------------------update---------------------------------------
	public List<Record> search(String login_account){
		StringBuffer sql = new StringBuffer();
		sql.append("select u.*,r.id as rid, r.name as rname, r.permissions from user u LEFT JOIN role r on r.id=u.role where 1=1 ");
		if(login_account!=null){
			sql.append("and login_account='"+login_account+"'");
		}
//		System.out.println(sql.toString());
		return Db.find(sql.toString());		
	}
	
	
	
	public boolean update(String password,String id){
		String sql="update user set password=? where id=?";
		return Db.update(sql.toString(),password,id)>0;
	}

	public List<Record> searchStatus(String login_account) {
		String sql="select u.name as username,r.name as rolename from user u LEFT JOIN role r on r.id=u.role where login_account=?";
		return Db.find(sql.toString(), login_account);
	}
	
	//----------------------------------------------new------------------------------------------
	public long pageCount(){
	       String sql="select count(*) as cn from user u";
			
			List<Record> list = Db.find(sql);
			long count=0;
			if (list == null || list.size() == 0) {
				count = 0;
			}
			else {
				Record record = list.get(0);
				count = record.getLong("cn");
			}
			long totleNum = count%20==0?count/20:count/20+1;
			return totleNum;
		}
	public boolean insert(String name, String role, String permission, String login_account, String which_laboratory){
		String sql = "insert into user(name, password, role, permission, login_account, which_laboratory) values(?,'000',?,?,?,?)";
		return Db.update(sql, name, role, permission, login_account, which_laboratory)>0;
	}
	
	public boolean delete(String id){
		String sql="delete from user where id="+id;
		return Db.update(sql)!=0;
	}
	
	public boolean updateUserRole(String userid, String role, String permission){
		StringBuffer sql = new StringBuffer();
		sql.append("update user set role='"+role+"'");
		if(permission!=""){
			sql.append(", permission='"+permission+"'");
		}
		sql.append(" where id="+userid);
		return Db.update(sql.toString())>0;
	}
}
