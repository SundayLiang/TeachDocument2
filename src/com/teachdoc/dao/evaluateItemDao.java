package com.teachdoc.dao;

import java.util.List;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Record;


public class evaluateItemDao extends Model<evaluateItemDao>{
	public static final evaluateItemDao dao = new evaluateItemDao();
//	public HttpServletRequest request;
//	HttpSession session = request.getSession();//用来获取用户名
	public List search(String id, String teacherId, String outlineId, String term, String courseId, String start, String length, String whatRole){
		Subject subject = SecurityUtils.getSubject();	
		Session session = subject.getSession();
		String userid=(String)session.getAttribute("login_account");
		StringBuffer sql = new StringBuffer();
		String flag="stu";
		sql.append("SELECT al.*,se.id AS remark_id,se.content,se.from_whom,");
        if(whatRole.equals(flag)){
        	sql.append("se.is_same, se.is_strict, se.is_lawful, se.is_focus, se.is_powerful,");
        }
	    sql.append("se.result AS resultn FROM ((SELECT ct.*, c.name AS course_name, c.nature, c.test_method, c.theory_time, c.experiment_time, c.totle_time, u.name AS teacher_name FROM (course c LEFT OUTER JOIN course_task ct ON ct.course_id=c.id)  LEFT JOIN user u ON ct.teacher_id=u.id) al LEFT OUTER JOIN "+whatRole+"_evaluate se ON al.id=se.task_id AND from_whom=" +
		       userid +
				") WHERE 1=1 ");
		
		if (id!=null){
			sql.append("AND al.id="+id+" ");
		}
		if (!teacherId.equals("all")){
			sql.append("AND teacher_id="+teacherId+" ");
		}
		if (outlineId!=null){
			sql.append("AND outline_id="+outlineId+" ");
		}
		if (!term.equals("all")){
			sql.append("AND term='"+term+"' ");
		}
		if (!courseId.equals("all")){
			sql.append("AND course_id="+courseId+" ");
		}
		sql.append("ORDER BY al.id LIMIT ");
		sql.append(start);
		sql.append(",");
		sql.append(length);
		System.out.println(sql.toString());
		return Db.find(sql.toString());
	}

	public List searchAllRemark(String taskId, String evaRole, String start){
		StringBuffer sql = new StringBuffer();
		sql.append("select * from ");
		sql.append(evaRole);
		sql.append("_evaluate where task_id=");
		sql.append(taskId);
		sql.append(" order by id limit ");
		sql.append(start);
		sql.append(", 5");
		System.out.println(sql.toString());
		return Db.find(sql.toString());
	}
	public long pageCountR(int pageSize,String taskId, String evaRole){
		String sql="select count(*) as cn from "+evaRole+"_evaluate where task_id="+taskId;
		
		List<Record> list = Db.find(sql);
		long count=0;
		if (list == null || list.size() == 0) {
			count = 0;
		}
		else {
			Record record = list.get(0);
			count = record.getLong("cn");
		}
		long totleNum = count%pageSize==0?count/pageSize:count/pageSize+1;
		return totleNum;
	}
	
	public long pageCount(int pageSize, String id, String teacherId, String outlineId, String term, String courseId, String whatRole) {
		StringBuffer sql = new StringBuffer();
		long count;
		long totleNum;
		sql.append("SELECT count(*) AS cn FROM (SELECT al.*,se.id AS remark_id,se.content,se.from_whom, se.result AS resultn FROM ((SELECT ct.*, c.name AS course_name, c.nature, c.test_method, c.theory_time, c.experiment_time, c.totle_time, u.name AS teacher_name FROM (course c LEFT OUTER JOIN course_task ct ON ct.course_id=c.id)  LEFT JOIN user u ON ct.teacher_id=u.id) al LEFT OUTER JOIN "+whatRole+"_evaluate se ON al.id=se.task_id AND from_whom=" +
				"1" +
				") WHERE 1=1 ");
		if (id!=null){
			sql.append("AND id='"+id+"' ");
		}
		if (!teacherId.equals("all")){
			sql.append("AND teacher_id='"+teacherId+"' ");
		}
		if (outlineId!=null){
			sql.append("AND outline_id="+outlineId+" ");
		}
		if (!term.equals("all")){
			sql.append("AND term='"+term+"' ");
		}
		if (!courseId.equals("all")){
			sql.append("AND course_id="+courseId+" ");
		}
		sql.append(") lalala");
//		System.out.println(sql.toString());
		List<Record> list = Db.find(sql.toString());
		if (list == null || list.size() == 0) {
			count = 0;
		}
		else {
			Record record = list.get(0);
			count = record.getLong("cn");
		}
		totleNum = count%pageSize==0?count/pageSize:count/pageSize+1;
		return totleNum;
	}
	
	public List searchTermLine(){
		String sql="SELECT TERM FROM course_task GROUP BY term";
		return Db.find(sql.toString());
	}
	public List searchTeacherLine(){
		String sql="SELECT u.id, u.`name` FROM course_task ct JOIN `user` u ON ct.teacher_id=u.id GROUP BY u.id  ";
		return Db.find(sql.toString());
	}
	public List searchCourseLine(){
		String sql="SELECT id, `name` FROM course";
		return Db.find(sql.toString());
	}
}
