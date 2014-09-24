<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" import="java.util.*,java.io.*,java.text.SimpleDateFormat" pageEncoding="gb2312"%>
<%!
	public boolean isOutDated(String d) throws Exception{
		return ((int) ((new Date().getTime()-new SimpleDateFormat("yyyy-M-d").parse(d).getTime()) / 86400000 + 1) >20);
	}
%>
<%
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/"; 	
System.out.println(request.getDispatcherType().name());
%>
    		
    		
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<base href="<%=basePath%>">
 
</head>

<body>
	<input type="text" id="x_axis"  >
	
<div id="container" style="min-width:700px;height:400px">111111111111111111</div>
</body>
</html>