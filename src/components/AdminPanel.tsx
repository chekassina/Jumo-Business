import React from 'react';
import { Database, Users, TrendingUp, CheckSquare, Phone, MessageSquare, Trash2, Calendar } from 'lucide-react';
import { Language, Lead } from '../types';
import { translations } from '../translations';
import { PESTS, PROPERTY_SIZES } from '../data';

interface AdminPanelProps {
  lang: Language;
  leads: Lead[];
  onUpdateLeadStatus: (leadId: string, newStatus: 'pending' | 'contacted' | 'completed') => void;
  onDeleteLead: (leadId: string) => void;
}

export default function AdminPanel({ lang, leads, onUpdateLeadStatus, onDeleteLead }: AdminPanelProps) {
  const t = translations[lang];

  // Stats calculation
  const totalLeads = leads.length;
  const potentialRevenue = leads.reduce((sum, lead) => sum + lead.estimatedPrice, 0);
  const contactedLeads = leads.filter(lead => lead.status !== 'pending').length;

  const handleStatusChange = (leadId: string, status: 'pending' | 'contacted' | 'completed') => {
    onUpdateLeadStatus(leadId, status);
  };

  const getPestNames = (pestIds: string[]) => {
    return pestIds.map(id => {
      const pest = PESTS.find(p => p.id === id);
      return pest ? (lang === 'en' ? pest.nameEn.split(' ')[0] : pest.nameFr.split(' ')[0]) : id;
    }).join(', ');
  };

  const getPropertySizeLabel = (sizeId: string) => {
    const size = PROPERTY_SIZES.find(s => s.id === sizeId);
    return size ? (lang === 'en' ? size.nameEn.split(' ')[0] : size.nameFr.split(' ')[0]) : sizeId;
  };

  return (
    <section id="admin-panel" className="relative py-12 bg-slate-50 border-t border-slate-200">
      
      {/* Background ambient light */}
      <div className="absolute inset-0 bg-emerald-500/[0.01] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Panel Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-100 border border-emerald-200 text-emerald-800 text-[10px] font-mono font-bold uppercase tracking-widest mb-2 shadow-sm">
              <Database className="w-3.5 h-3.5" />
              <span>Simulated CRM System</span>
            </div>
            <h2 className="text-2xl font-display font-extrabold text-slate-900">
              {t.adminTitle}
            </h2>
            <p className="text-xs text-slate-500 mt-1 font-semibold">
              {t.adminSubtitle}
            </p>
          </div>

          <span className="text-[10px] font-mono text-slate-400 max-w-xs text-left md:text-right font-medium">
            *This database resides in LocalStorage. Submit details on the estimator above to see new entries instantly appear here.
          </span>
        </div>

        {/* Real-time CRM Key Metrics Card Group */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          {/* Total Leads */}
          <div className="p-5 rounded-xl bg-white border border-slate-200 flex items-center justify-between shadow-sm">
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">{t.adminTotalLeads}</div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 mt-1">{totalLeads}</div>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-600">
              <Users className="w-5 h-5" />
            </div>
          </div>

          {/* Potential Revenue */}
          <div className="p-5 rounded-xl bg-white border border-slate-200 flex items-center justify-between shadow-sm">
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">{t.adminPotentialRev}</div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-emerald-700 mt-1">
                XAF {potentialRevenue.toLocaleString()}
              </div>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-600">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>

          {/* Contacted/Processed count */}
          <div className="p-5 rounded-xl bg-white border border-slate-200 flex items-center justify-between shadow-sm">
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">{t.adminCompletedLeads}</div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-emerald-700 mt-1">
                {contactedLeads} <span className="text-xs font-mono text-slate-400 font-normal">/ {totalLeads}</span>
              </div>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-600">
              <CheckSquare className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* CRM Leads Table */}
        <div className="mt-6 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            {leads.length > 0 ? (
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 font-mono uppercase tracking-wider text-[10px]">
                    <th className="p-4 sm:p-5">{t.adminColName}</th>
                    <th className="p-4 sm:p-5">{t.adminColContact}</th>
                    <th className="p-4 sm:p-5">{t.adminColPests}</th>
                    <th className="p-4 sm:p-5">Details</th>
                    <th className="p-4 sm:p-5">{t.adminColPrice}</th>
                    <th className="p-4 sm:p-5">{t.adminColStatus}</th>
                    <th className="p-4 sm:p-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                      {/* Name */}
                      <td className="p-4 sm:p-5 font-extrabold text-slate-900 flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></div>
                        <span>{lead.name}</span>
                      </td>

                      {/* Contact */}
                      <td className="p-4 sm:p-5">
                        <div className="font-extrabold text-slate-800 font-mono">{lead.phone}</div>
                        <div className="text-slate-400 text-[10px] uppercase font-mono font-bold">{lead.city}</div>
                      </td>

                      {/* Pests list */}
                      <td className="p-4 sm:p-5">
                        <span className="px-2 py-1 rounded bg-slate-50 border border-slate-200 text-[10px] font-bold text-slate-700">
                          {getPestNames(lead.pests)}
                        </span>
                      </td>

                      {/* Size & Info */}
                      <td className="p-4 sm:p-5">
                        <div className="text-slate-500 font-semibold">{getPropertySizeLabel(lead.propertySize)} size</div>
                        {lead.discountApplied && (
                          <span className="text-[9px] font-mono font-extrabold bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded border border-emerald-100">
                            -30% applied
                          </span>
                        )}
                      </td>

                      {/* Price */}
                      <td className="p-4 sm:p-5 font-extrabold font-mono text-emerald-700">
                        XAF {lead.estimatedPrice.toLocaleString()}
                      </td>

                      {/* Status select dropdown */}
                      <td className="p-4 sm:p-5">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                          className={`px-2 py-1.5 rounded-lg border text-[11px] font-extrabold font-mono focus:outline-none cursor-pointer ${
                            lead.status === 'pending'
                              ? 'bg-red-50 text-red-700 border-red-200'
                              : lead.status === 'contacted'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}
                        >
                          <option value="pending">🔴 Pending</option>
                          <option value="contacted">🟡 Contacted</option>
                          <option value="completed">🟢 Completed</option>
                        </select>
                      </td>

                      {/* Action buttons (Simulated) */}
                      <td className="p-4 sm:p-5 text-right space-x-2 shrink-0">
                        <a
                          href={`tel:${lead.phone}`}
                          className="inline-flex p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 hover:text-emerald-700 hover:border-emerald-500/40 transition-colors"
                          title="Call Lead"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => {
                            const pestsText = lead.pests.join(', ');
                            const text = encodeURIComponent(`Hello ${lead.name}, this is Jumo Business Pest Control. We received your quote request for ${pestsText}. We would like to confirm your schedule.`);
                            window.open(`https://wa.me/${lead.phone.replace(/\+/g, '')}?text=${text}`, '_blank');
                          }}
                          className="inline-flex p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 hover:text-emerald-700 hover:border-emerald-500/40 transition-colors cursor-pointer"
                          title="Contact via WhatsApp"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteLead(lead.id)}
                          className="inline-flex p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-400 hover:text-red-500 hover:border-red-300 transition-colors cursor-pointer"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-8 text-center text-slate-500 space-y-2">
                <p className="text-sm font-semibold">{t.adminNoLeads}</p>
                <div className="flex justify-center">
                  <button
                    onClick={() => document.getElementById('estimator')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-xs text-emerald-600 font-mono uppercase tracking-wider font-bold underline cursor-pointer"
                  >
                    Go to Calculator
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
