<%--
  User: campus2H030
  Date: 2024-11-26
  Time: 오후 5:17
--%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="fmt" uri="jakarta.tags.fmt" %>
<html>
<%@ include file="../head.jsp" %>

<body class="m-5">
<h1 class="text-2xl font-semibold">Dept Manager</h1>
<ul class="border px-5 pb-5">
    <c:forEach var="dept" items="${depts}" varStatus="status">
        <li class="pl-${dept.depth * 3}
                mt-${6 - dept.depth * 3}
                <c:if test="${dept.isTop}">font-bold</c:if>">
            <c:if test="${dept.pid != 0}">
                -
            </c:if>
            <a href="./depts/${dept.id}">${dept.dname}</a>

            <c:if test="${dept.captainName != null}">
                <small class="text-xs text-slate-400">(${dept.captainName})</small>
            </c:if>

            <a href="${pageContext.request.contextPath}/depts/0?pid=${dept.id}" class="float-right">추가</a>

        </li>
    </c:forEach>
</ul>

<%--dept.id가 부모 부서로 설정 --%>
<a href="${pageContext.request.contextPath}/depts/0"
   class="hover:text-blue-800 border rounded-md px-2 bg-blue-500 hover:bg-blue-300 text-white">
    부서 추가
</a>

</body>
</html>
