<%--
  User: campus2H030
  Date: 2024-11-25
  Time: 오전 11:27
--%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="fmt" uri="jakarta.tags.fmt" %>
<html>
<%@ include file="./head.jsp" %>
<body>

<div class="container">
    <h1></h1>
    <h1>Shop Main</h1>
    <h3>${version}</h3>
    <c:set var="num" value="10000"/> <%-- 지역변수 --%>
    <fmt:formatNumber value="${num}" var="numx"/>
    num: ${numx}
    <%--<fmt:formatNumber value="${createdate}" var="createdatex" pattern="yyyy-MM-dd HH:mm:ss"/>
    , createdate: ${createdate}V--%>

    <ul class="border p-3 w-96">
        <c:forEach var="cust" items="${custs}" varStatus="status">
            <li class='<c:if test="${status.first}">XXX</c:if>'>
                <a href="/modify/${cust.id}" class="hover:text-blue-500">
                        ${status.count} - ${cust.id}. ${cust.name}</a>
                <a href="javascript:del(${cust.id})">Remove</a>
            </li>
        </c:forEach>

        <c:if test="${custs.size() == 0}">
            <p>There is no custs</p>
        </c:if>
    </ul>

    <div><a href="/add" class="underline text-blue-500">Add Cust</a></div>

    <script>
        function del(id) {
            if (confirm("Are u sure??")) {
                window.location.href = `/remove/` + id;
            }
        }
    </script>
</div>
</body>
</html>
