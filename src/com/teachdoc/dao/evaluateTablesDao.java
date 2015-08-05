package com.teachdoc.dao;

import java.io.File;
import java.util.Date;
import java.util.List;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Model;

public class evaluateTablesDao extends Model<evaluateTablesDao>{
	public static final evaluateTablesDao dao = new evaluateTablesDao();
	
	public List searchStu(){
		return null;
	}
	public List searchLeader(String id, String taskId, String fromWhom, String start, String length){
		StringBuffer sql = new StringBuffer();
		sql.append("select * from leader_evaluate where 1=1 ");
		if(id!=null){
			sql.append("and id="+id+" ");
		}
		if (taskId!=null){
			sql.append("AND task_id="+taskId+" ");
		}
		if (fromWhom!=null){
			sql.append("AND from_whom="+fromWhom+" ");
		}
		sql.append("ORDER BY id ");
		if (start!=null){
			sql.append("LIMIT "+start);
			sql.append(",");
			sql.append(length);
		}
		return Db.find(sql.toString());
	}
	public List searchSuper(String id, String taskId, String fromWhom, String start, String length){
		StringBuffer sql = new StringBuffer();
		sql.append("select * from supervisor_evaluate where 1=1 ");
		if(id!=null){
			sql.append("and id="+id+" ");
		}
		if (taskId!=null){
			sql.append("AND task_id="+taskId+" ");
		}
		if (fromWhom!=null){
			sql.append("AND from_whom="+fromWhom+" ");
		}
		sql.append("ORDER BY id ");
		if (start!=null){
			sql.append("LIMIT "+start);
			sql.append(",");
			sql.append(length);
		}
		System.out.println(sql.toString()+"hahahhahahahahah");
		return Db.find(sql.toString());
	}
	public int insertStuEva(int taskId, String isSame, String isStrict, String isLawful, String isFocus, String isPowerful, int from_whom){
		StringBuffer sql = new StringBuffer();
		sql.append("insert into stu_evaluate(task_id, is_same, is_strict, is_lawful, is_focus, is_powerful, from_whom) values(");
		sql.append(taskId+","+isSame+","+isStrict+","+isLawful+","+isFocus+","+isPowerful+","+from_whom);
		sql.append(")");
//		System.out.println(sql.toString());
		return Db.update(sql.toString());
	}
	
	public int insertLeaderEva(int taskId, String filedir, String url, String fileLastName, File file, String result, int from_whom){
		Date t=new Date();
		long ts=t.getTime();
	    String fileName=Long.toString(ts);
		File f =new File(filedir+url);
		if (!f.exists()  && !f.isDirectory()){       
		    f.mkdirs();    
		}
		File fi=new File(filedir+url+File.separator+File.separator+fileName+fileLastName);
		if(!fi.exists()){
			file.renameTo(fi);
		}
		else{
			System.out.println("wenjianyicunzai");
			return 0;
		}
		StringBuffer sql = new StringBuffer();
		sql.append("insert into leader_evaluate(task_id, content, result, from_whom) values(");
		sql.append(taskId+",'"+filedir+File.separator+url+File.separator+File.separator+fileName+fileLastName+"',"+result+","+from_whom);
		sql.append(")");
		return Db.update(sql.toString());
	}

	public int insertSuperEva(int taskId, String filedir, String url, String fileLastName, File file, String result, int from_whom){
		Date t=new Date();
		long ts=t.getTime();
	    String fileName=Long.toString(ts);
		File f =new File(filedir+url);
		if (!f.exists()  && !f.isDirectory()){       
		    f.mkdirs();    
		}
		File fi=new File(filedir+url+File.separator+File.separator+fileName+fileLastName);
		if(!fi.exists()){
			file.renameTo(fi);
		}
		else{
			System.out.println("wenjianyicunzai");
			return 0;
		}
		StringBuffer sql = new StringBuffer();
		sql.append("insert into supervisor_evaluate(task_id, content, result, from_whom) values(");
		sql.append(taskId+",'"+filedir+File.separator+url+File.separator+File.separator+fileName+fileLastName+"',"+result+","+from_whom);
		sql.append(")");
		System.out.println(sql.toString());
		return Db.update(sql.toString());
	}
	
	public int updateStuEva(String isSame, String isStrict, String isLawful, String isFocus, String isPowerful, int remarkId){StringBuffer sql = new StringBuffer();
	sql.append("update stu_evaluate set is_same="+isSame+", is_strict="+isStrict+", is_lawful="+isLawful+", is_focus="+isFocus+", is_powerful="+isPowerful+" where id="+remarkId);
	
//	System.out.println(sql.toString());
	return Db.update(sql.toString());}
	
	
	public int updateLeaderEva(String filedir, String url, String fileLastName, String oldcontent, File file, String result, int remarkId){
		StringBuffer sql = new StringBuffer();
		sql.append("update leader_evaluate set result="+result);
		if(filedir==null){
			sql.append(" where id="+remarkId);
			return Db.update(sql.toString());
		}
		else {
			Date t=new Date();
			long ts=t.getTime();
			System.out.println(ts);
		    String fileName=Long.toString(ts);
			File f =new File(filedir+url);
			if (!f.exists()  && !f.isDirectory()){       
			    f.mkdirs();    
			}
			File fi=new File(filedir+url+File.separator+File.separator+fileName+fileLastName);
			if(!fi.exists()){
				file.renameTo(fi);
			}
			else{
				System.out.println("wen jian yi cun zai");
				return 0;
			}
			File ofi=new File(oldcontent);
			ofi.delete();
			sql.append(", content='"+filedir+File.separator+url+File.separator+File.separator+fileName+fileLastName+"' where id="+remarkId);
			System.out.println(sql.toString());
			return Db.update(sql.toString());
		}
	}
	
	
	
	public int updateSuperEva(String filedir, String url, String fileLastName, String oldcontent, File file, String result, int remarkId){
		StringBuffer sql = new StringBuffer();
		sql.append("update supervisor_evaluate set result="+result);
		if(filedir==null){
			sql.append(" where id="+remarkId);
			return Db.update(sql.toString());
		}
		else {
			Date t=new Date();
			long ts=t.getTime();
			System.out.println(ts);
		    String fileName=Long.toString(ts);
			File f =new File(filedir+url);
			if (!f.exists()  && !f.isDirectory()){       
			    f.mkdirs();    
			}
			File fi=new File(filedir+url+File.separator+File.separator+fileName+fileLastName);
			if(!fi.exists()){
				file.renameTo(fi);
			}
			else{
				System.out.println("�ļ�������");
				return 0;
			}
			File ofi=new File(oldcontent);
			ofi.delete();
			sql.append(", content='"+filedir+File.separator+url+File.separator+File.separator+fileName+fileLastName+"' where id="+remarkId);
			System.out.println(sql.toString());
			return Db.update(sql.toString());
		}
}
	public int dele(String id, String role){
		String sql = "delete from "+role+"_evaluate where id="+id;
		return Db.update(sql);
	}
}
