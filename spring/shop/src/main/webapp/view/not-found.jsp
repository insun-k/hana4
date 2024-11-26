<%--
  User: campus2H030
  Date: 2024-11-26
  Time: 오전 10:06
--%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="fmt" uri="jakarta.tags.fmt" %>
<html>
<head>
    <meta charset="UTF-8">
    <title>${data} Not Found$</title>
</head>
<body>
<h1>${data} Not Found$</h1>
<c:if test="${message != null}">
<div>${message}</div>
</c:if>

<div>
    <a href="${pageContext.request.contextPath}/">Home</a>
</html>
