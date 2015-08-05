package com.teachdoc.dao;

import java.util.List;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Model;

public class PreStandard extends Model<PreStandard>{

	public static final PreStandard dao= new PreStandard();
	
	public List search(String id,String name,String courseNature){
		
		StringBuffer sql = new StringBuffer();
		sql.append("select p.ID,p.courseNature,p.name from p_standard p "
//				+ "left join user u on t.userID=u.ID "
				+ "where 1=1 ");
		if(id!=null && id.length()>0){
			sql.append(" and ID = "+id);
		}
		if(name != null && name.length()>0){
			sql.append(" and name = '"+id+"'");
		}
		if(courseNature !=null && courseNature.trim().length()>0){
			sql.append(" and courseNature = '"+courseNature+"'");
		}
		
		return Db.find(sql.toString());
	}
	
	public boolean insert(String name,String courseNature){
		if(courseNature!=null){
			String sql="insert into p_standard(name,courseNature) values(?,?)";
			return Db.update(sql.toString(),name,courseNature)>0;
		}
		return false;	
	}
}
