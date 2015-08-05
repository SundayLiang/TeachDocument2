package com.teachdoc.dao;

import java.util.HashMap;
import java.util.List;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Record;

public class weightDao extends Model<weightDao>{
	public static final weightDao dao= new weightDao();
	
	public List search(){
		String sql="SELECT * FROM WEIGHT_NUM ORDER BY ID";
		return Db.find(sql);
	}
	
	public int changeNum(String id, String num){
		StringBuffer sql = new StringBuffer();
		sql.append("update weight_num set weight="+num+" where id="+id);
		
		System.out.println(sql.toString());
		return Db.update(sql.toString());
	}
	
	public List searchNature(String natureName){
		StringBuffer sql = new StringBuffer();
		sql.append("SELECT * FROM STANDARD WHERE COURSE_NATURE='"+natureName+"'");
		return Db.find(sql.toString());
	   } 
	
	public int changeitem(String id, String num){
		String sql = "update standard set weight="+num+" where id="+id;
		System.out.println(sql);
		return Db.update(sql);
	}
}
