import { useState, useEffect, useCallback } from 'react';
import * as XLSX from 'xlsx';
import { LogOut, Download, Search, Eye, Trash2, FileSpreadsheet, Users, Clock, CheckCircle, XCircle, Loader, ArrowLeft } from 'lucide-react';
import { supabase, type Application, type ApplicationStatus } from '@/lib/supabase';
import { useAuth } from '@/lib/auth';
import { Link, useRouter } from '@/lib/router';

const statusConfig: Record<ApplicationStatus, { label: string; color: string; bg: string; icon: typeof Clock }> = {
  new: { label: 'New', color: 'text-blue-700', bg: 'bg-blue-100', icon: Clock },
  reviewed: { label: 'Reviewed', color: 'text-amber-700', bg: 'bg-amber-100', icon: Eye },
  contacted: { label: 'Contacted', color: 'text-teal-700', bg: 'bg-teal-100', icon: CheckCircle },
  rejected: { label: 'Rejected', color: 'text-red-700', bg: 'bg-red-100', icon: XCircle },
};

export function AdminDashboardPage() {
  const { session, loading } = useAuth();
  const { navigate } = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [filtered, setFiltered] = useState<Application[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selected, setSelected] = useState<Application | null>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState('');

  const loadApplications = useCallback(async () => {
    setDataLoading(true);
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setApplications((data as Application[]) || []);
    }
    setDataLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && !session) {
      navigate('/admin');
      return;
    }
    if (session) {
      loadApplications();
    }
  }, [session, loading, navigate, loadApplications]);

  useEffect(() => {
    let result = applications;
    if (statusFilter !== 'all') {
      result = result.filter((a) => a.status === statusFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((a) =>
        `${a.first_name} ${a.last_name}`.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q) ||
        a.intended_country?.toLowerCase().includes(q) ||
        a.intended_program?.toLowerCase().includes(q)
      );
    }
    setFiltered(result);
  }, [applications, search, statusFilter]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  const updateStatus = async (id: string, status: ApplicationStatus) => {
    const { error } = await supabase.from('applications').update({ status }).eq('id', id);
    if (error) {
      setError(error.message);
      return;
    }
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    if (selected?.id === id) setSelected({ ...selected, status });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this application? This cannot be undone.')) return;
    const { error } = await supabase.from('applications').delete().eq('id', id);
    if (error) {
      setError(error.message);
      return;
    }
    setApplications((prev) => prev.filter((a) => a.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const exportToXLS = (rows: Application[], filename: string) => {
    const worksheetData = rows.map((a, i) => ({
      '#': i + 1,
      'First Name': a.first_name,
      'Last Name': a.last_name,
      'Email': a.email,
      'Phone': a.phone,
      'Date of Birth': a.date_of_birth || '',
      'Gender': a.gender || '',
      'Nationality': a.nationality || '',
      'Current Address': a.current_address || '',
      'City': a.city || '',
      'Country': a.country || '',
      'Intended Country': a.intended_country || '',
      'Intended University': a.intended_university || '',
      'Intended Program': a.intended_program || '',
      'Study Level': a.intended_level || '',
      'Intake': a.intake || '',
      'Current Education': a.current_education || '',
      'Institution Name': a.institution_name || '',
      'Graduation Year': a.graduation_year || '',
      'GPA': a.gpa || '',
      'English Test': a.english_test || '',
      'English Score': a.english_score || '',
      'Work Experience': a.work_experience || '',
      'Funding Source': a.funding_source || '',
      'Passport Number': a.passport_number || '',
      'Message': a.message || '',
      'Status': a.status,
      'Submitted At': new Date(a.created_at).toLocaleString(),
    }));

    const ws = XLSX.utils.json_to_sheet(worksheetData);
    ws['!cols'] = Object.keys(worksheetData[0] || {}).map(() => ({ wch: 18 }));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Applications');
    XLSX.writeFile(wb, filename);
  };

  const stats = {
    total: applications.length,
    new: applications.filter((a) => a.status === 'new').length,
    contacted: applications.filter((a) => a.status === 'contacted').length,
    rejected: applications.filter((a) => a.status === 'rejected').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader className="w-8 h-8 text-teal-600 animate-spin" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-teal-600 transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <div className="w-9 h-9 bg-teal-600 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-slate-800">Admin Dashboard</h1>
                <p className="text-xs text-slate-500">{session.user.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-red-600 font-medium text-sm transition-colors"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Applications" value={stats.total} icon={Users} color="teal" />
          <StatCard label="New" value={stats.new} icon={Clock} color="blue" />
          <StatCard label="Contacted" value={stats.contacted} icon={CheckCircle} color="emerald" />
          <StatCard label="Rejected" value={stats.rejected} icon={XCircle} color="red" />
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search name, email, program..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm font-medium text-slate-700"
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="reviewed">Reviewed</option>
                <option value="contacted">Contacted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => exportToXLS(filtered, `applications_filtered_${Date.now()}.xls`)}
                disabled={filtered.length === 0}
                className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 text-white rounded-xl font-medium text-sm hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-4 h-4" /> Export Filtered ({filtered.length})
              </button>
              <button
                onClick={() => exportToXLS(applications, `applications_all_${Date.now()}.xls`)}
                disabled={applications.length === 0}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-700 text-white rounded-xl font-medium text-sm hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FileSpreadsheet className="w-4 h-4" /> Export All ({applications.length})
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          {dataLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader className="w-8 h-8 text-teal-600 animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Users className="w-12 h-12 text-gray-300 mb-4" />
              <p className="text-slate-500 font-medium">No applications found</p>
              <p className="text-slate-400 text-sm mt-1">
                {applications.length === 0 ? 'Applications submitted by students will appear here.' : 'Try adjusting your filters.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Student</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Destination</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Program</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Date</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((app) => {
                    const sc = statusConfig[app.status];
                    return (
                      <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4">
                          <div className="font-medium text-slate-800">{app.first_name} {app.last_name}</div>
                          <div className="text-sm text-slate-500">{app.email}</div>
                        </td>
                        <td className="px-4 py-4 hidden md:table-cell text-sm text-slate-600">
                          {app.intended_country || '—'}
                          <div className="text-xs text-slate-400">{app.intended_level || ''}</div>
                        </td>
                        <td className="px-4 py-4 hidden lg:table-cell text-sm text-slate-600">
                          {app.intended_program || '—'}
                          <div className="text-xs text-slate-400">{app.intake || ''}</div>
                        </td>
                        <td className="px-4 py-4">
                          <select
                            value={app.status}
                            onChange={(e) => updateStatus(app.id, e.target.value as ApplicationStatus)}
                            className={`text-xs font-semibold px-3 py-1.5 rounded-lg border-0 cursor-pointer ${sc.bg} ${sc.color} focus:outline-none focus:ring-2 focus:ring-teal-400`}
                          >
                            <option value="new">New</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="contacted">Contacted</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </td>
                        <td className="px-4 py-4 hidden sm:table-cell text-sm text-slate-500">
                          {new Date(app.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelected(app)}
                              className="p-2 text-slate-500 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                              title="View details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(app.id)}
                              className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div>
                <h2 className="text-xl font-bold text-slate-800">{selected.first_name} {selected.last_name}</h2>
                <p className="text-sm text-slate-500">{selected.email} · {selected.phone}</p>
              </div>
              <button onClick={() => setSelected(null)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-gray-100 rounded-lg">
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <DetailGroup title="Personal Information" items={[
                ['Date of Birth', selected.date_of_birth || '—'],
                ['Gender', selected.gender || '—'],
                ['Nationality', selected.nationality || '—'],
                ['Address', [selected.current_address, selected.city, selected.country].filter(Boolean).join(', ') || '—'],
              ]} />
              <DetailGroup title="Study Preferences" items={[
                ['Destination', selected.intended_country || '—'],
                ['University', selected.intended_university || '—'],
                ['Program', selected.intended_program || '—'],
                ['Level', selected.intended_level || '—'],
                ['Intake', selected.intake || '—'],
              ]} />
              <DetailGroup title="Academic Background" items={[
                ['Qualification', selected.current_education || '—'],
                ['Institution', selected.institution_name || '—'],
                ['Graduation Year', selected.graduation_year || '—'],
                ['GPA / Score', selected.gpa || '—'],
                ['English Test', selected.english_test || '—'],
                ['English Score', selected.english_score || '—'],
                ['Work Experience', selected.work_experience || '—'],
                ['Funding Source', selected.funding_source || '—'],
                ['Passport Number', selected.passport_number || '—'],
              ]} />
              {selected.message && (
                <DetailGroup title="Additional Message" items={[['Message', selected.message]]} />
              )}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="text-sm text-slate-500">
                  Submitted: {new Date(selected.created_at).toLocaleString()}
                </div>
                <button
                  onClick={() => exportToXLS([selected], `application_${selected.first_name}_${selected.last_name}.xls`)}
                  className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl text-sm font-medium hover:bg-teal-700 transition-colors"
                >
                  <Download className="w-4 h-4" /> Export This Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }: { label: string; value: number; icon: typeof Users; color: string }) {
  const colors: Record<string, string> = {
    teal: 'bg-teal-50 text-teal-600',
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    red: 'bg-red-50 text-red-600',
  };
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5">
      <div className="flex items-center gap-3">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${colors[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <div className="text-2xl font-bold text-slate-800">{value}</div>
          <div className="text-xs text-slate-500 font-medium">{label}</div>
        </div>
      </div>
    </div>
  );
}

function DetailGroup({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-3">{title}</h3>
      <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-3 bg-gray-50 rounded-xl p-4">
        {items.map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs text-slate-400 font-medium">{label}</dt>
            <dd className="text-slate-700 text-sm mt-0.5">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
