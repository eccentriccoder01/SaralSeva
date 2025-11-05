import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmployeeContext } from "./context/EmployeeContext";
import { Link } from "react-router-dom";
import { Search, Filter, Download, RefreshCw, AlertCircle } from "lucide-react";

const Tickets = () => {
  const { tickets, getAllSchemes, loading, error } =
    useContext(EmployeeContext);

  // Filter and search states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("latest");

  useEffect(() => {
    getAllSchemes();
  }, []);

  // Filter and sort logic
  const filteredTickets =
    tickets?.filter((ticket) => {
      const matchesSearch =
        ticket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.scheme_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.registration_no.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || ticket.initial_status === statusFilter;

      return matchesSearch && matchesStatus;
    }) || [];

  // Sort tickets
  const sortedTickets = [...filteredTickets].sort((a, b) => {
    if (sortBy === "latest")
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    if (sortBy === "oldest")
      return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  // Statistics
  const stats = {
    total: tickets?.length || 0,
    open: tickets?.filter((t) => t.initial_status === "pending").length || 0,
    closed: tickets?.filter((t) => t.initial_status !== "pending").length || 0,
  };

  // Export functionality
  const handleExport = () => {
    const csvContent = [
      ["Name", "Email", "Scheme", "Registration No", "Status", "Ticket Status"],
      ...sortedTickets.map((t) => [
        t.name,
        t.email,
        t.scheme_name,
        t.registration_no,
        t.initial_status,
        t.initial_status === "pending" ? "Open" : "Closed",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tickets-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-orange-900 jost">
            Scheme Application Tickets
          </h1>
          <p className="text-gray-600 mt-1">
            Manage and track all scheme applications
          </p>
        </div>
        <button
          onClick={() => getAllSchemes()}
          className="flex items-center gap-2 px-4 py-2 bg-orange-900 text-white rounded-lg hover:bg-orange-800 transition-colors"
          disabled={loading}
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
          <p className="text-blue-600 text-sm font-semibold">Total Tickets</p>
          <p className="text-3xl font-bold text-blue-900">{stats.total}</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg border border-red-200">
          <p className="text-red-600 text-sm font-semibold">Open Tickets</p>
          <p className="text-3xl font-bold text-red-900">{stats.open}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
          <p className="text-green-600 text-sm font-semibold">Closed Tickets</p>
          <p className="text-3xl font-bold text-green-900">{stats.closed}</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Search Input */}
        <div className="flex-1 min-w-[250px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, email, scheme, or registration no..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <Filter className="text-gray-400 w-5 h-5" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Sort By */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          <option value="latest">Latest First</option>
          <option value="oldest">Oldest First</option>
          <option value="name">Name (A-Z)</option>
        </select>

        {/* Export Button */}
        <button
          onClick={handleExport}
          disabled={sortedTickets.length === 0}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Error State */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="text-red-600 w-5 h-5" />
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <RefreshCw className="w-12 h-12 text-orange-900 animate-spin mb-4" />
          <p className="text-gray-600 font-semibold">Loading tickets...</p>
        </div>
      ) : sortedTickets.length === 0 ? (
        /* Empty State */
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-orange-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Tickets Found
          </h3>
          <p className="text-gray-600">
            {searchTerm || statusFilter !== "all"
              ? "Try adjusting your filters or search terms"
              : "No scheme application tickets have been assigned to you yet"}
          </p>
        </div>
      ) : (
        /* Table */
        <div className="overflow-hidden border border-gray-200 rounded-lg">
          <div className="overflow-x-auto">
            <Table>
              <TableCaption>
                Showing {sortedTickets.length} of {tickets?.length || 0} tickets
              </TableCaption>
              <TableHeader className="bg-orange-900">
                <TableRow>
                  <TableHead className="text-white font-semibold">
                    Applicant Name
                  </TableHead>
                  <TableHead className="text-white font-semibold">
                    Email
                  </TableHead>
                  <TableHead className="text-white font-semibold">
                    Scheme Name
                  </TableHead>
                  <TableHead className="text-white font-semibold">
                    Registration No
                  </TableHead>
                  <TableHead className="text-white font-semibold">
                    Status
                  </TableHead>
                  <TableHead className="text-white font-semibold">
                    Ticket Status
                  </TableHead>
                  <TableHead className="text-white font-semibold">
                    Priority
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedTickets.map((ticket) => {
                  // Calculate priority based on pending time (if createdAt exists)
                  const daysSinceCreation = ticket.createdAt
                    ? Math.floor(
                        (new Date() - new Date(ticket.createdAt)) /
                          (1000 * 60 * 60 * 24)
                      )
                    : 0;
                  const isUrgent =
                    ticket.initial_status === "pending" &&
                    daysSinceCreation > 7;

                  return (
                    <TableRow
                      key={ticket._id}
                      className="hover:bg-orange-50/70"
                    >
                      <TableCell>
                        <Link
                          to={`/ticket/${ticket?._id}`}
                          className="font-semibold text-stone-800 hover:text-orange-700 hover:underline flex items-center gap-2"
                        >
                          {isUrgent && (
                            <span
                              className="w-2 h-2 bg-red-500 rounded-full animate-pulse"
                              title="Urgent"
                            ></span>
                          )}
                          {ticket?.name}
                        </Link>
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {ticket?.email}
                      </TableCell>
                      <TableCell className="font-medium">
                        {ticket?.scheme_name}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {ticket?.registration_no}
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold capitalize">
                          {ticket?.initial_status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-3 py-1 text-sm font-semibold rounded-full ${
                            ticket?.initial_status === "pending"
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {ticket?.initial_status === "pending"
                            ? "Open"
                            : "Closed"}
                        </span>
                      </TableCell>
                      <TableCell>
                        {ticket.initial_status === "pending" && (
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded ${
                              isUrgent
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {isUrgent ? "Urgent" : "Normal"}
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tickets;
