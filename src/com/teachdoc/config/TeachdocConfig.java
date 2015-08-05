package com.teachdoc.config;

import com.alibaba.druid.filter.stat.StatFilter;
import com.alibaba.druid.util.JdbcConstants;
import com.alibaba.druid.wall.WallConfig;
import com.alibaba.druid.wall.WallFilter;
import com.jfinal.config.Constants;
import com.jfinal.config.Handlers;
import com.jfinal.config.Interceptors;
import com.jfinal.config.JFinalConfig;
import com.jfinal.config.Plugins;
import com.jfinal.config.Routes;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.druid.DruidPlugin;
import com.teachdoc.controller.*;

public class TeachdocConfig extends JFinalConfig{

	private Routes routes;
	@Override
	public void configConstant(Constants arg0) {
		
	}

	@Override
	public void configHandler(Handlers arg0) {
		
	}

	@Override
	public void configInterceptor(Interceptors arg0) {
		
	}

	@Override
	public void configPlugin(Plugins plugins) {
		DruidPlugin druidPlugin = new DruidPlugin("jdbc:mysql://localhost:3306/teachdoc", "root", "123456");
		druidPlugin.addFilter(new StatFilter());
		WallFilter wall = new WallFilter();
		wall.setDbType(JdbcConstants.MYSQL);
		WallConfig config = new WallConfig();
		config.setStrictSyntaxCheck(false); 
		wall.setConfig(config);
		druidPlugin.setInitialSize(1); 
		druidPlugin.setMaxActive(20);
		druidPlugin.setMinIdle(1);
		druidPlugin.setMaxWait(60000);
		druidPlugin.setTimeBetweenEvictionRunsMillis(60000);
		druidPlugin.setMinEvictableIdleTimeMillis(300000);
		druidPlugin.setValidationQuery("SELECT 1"); 
		druidPlugin.setTestWhileIdle(true);
		druidPlugin.setTestOnBorrow(false);
		druidPlugin.setTestOnReturn(false);
		druidPlugin.setMaxPoolPreparedStatementPerConnectionSize(50); 
		
		plugins.add(druidPlugin);
		
		ActiveRecordPlugin recordPlugin = new ActiveRecordPlugin(druidPlugin);
		plugins.add(recordPlugin);

//		plugins.add(new ShiroPlugin(routes));


//		recordPlugin.addMapping("1",1.class);
		
	}

	@Override
	public void configRoute(Routes r) {
		this.routes = r;
		r.add("/UpDoc",UpDocController.class);
		r.add("/TeachDoc",TeachDocController.class);
		r.add("/TeachDocRecord",TeachDocRecordController.class);
		r.add("/OutlineCalRecord",OutlineCalRecordController.class);
		r.add("/CalendarRecord",CalendarRecordController.class);
		r.add("/TaskStandard",TaskStandardController.class);
		r.add("/evaluateItem", evaluateItemController.class);
		r.add("/evaluateTables", evaluateTablesController.class);
		r.add("/weight", weightController.class);
		r.add("/Course",CourseController.class);
		r.add("/importExcel",importExcelController.class);
		r.add("/User",UserController.class);
		r.add("RolePermission",RolePermissionController.class);
		r.add("CourseTest",CourseTestController.class);
		
		
		//start by lfl
		r.add("/invigilator",InvigilatorController.class);
		
	}

}
