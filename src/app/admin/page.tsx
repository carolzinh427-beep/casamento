'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  CheckCircle,
  XCircle,
  Baby,
  UserCheck,
  Gift,
  MessageSquare,
  Image as ImageIcon,
  Settings,
  Calendar,
  Clock,
  Plus,
  Trash2,
  Edit2,
  Eye,
  Check,
  MapPin,
  Save,
  RefreshCw,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'casamento' | 'eventos' | 'fotos' | 'presentes' | 'rsvp' | 'recados'
  >('dashboard');

  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<any>(null);
  const [casamento, setCasamento] = useState<any>(null);
  const [eventos, setEventos] = useState<any[]>([]);
  const [fotos, setFotos] = useState<any[]>([]);
  const [presentes, setPresentes] = useState<any[]>([]);
  const [rsvps, setRsvps] = useState<any[]>([]);
  const [recados, setRecados] = useState<any[]>([]);
  const [rsvpFilter, setRsvpFilter] = useState<'todos' | 'confirmados' | 'nao_confirmados'>('todos');

  // Estados de formulários administrativos
  const [savingCasamento, setSavingCasamento] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  // Novo presente modal / form
  const [novoPresente, setNovoPresente] = useState({
    nome: '',
    categoria: 'Geral',
    descricao: '',
    imagem: '/images/presentes/padrao.jpg',
    valor: '',
  });
  const [editingPresente, setEditingPresente] = useState<any | null>(null);

  // Nova foto modal / form
  const [novaFoto, setNovaFoto] = useState({
    url: '',
    legenda: '',
    principal: false,
  });

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [resMetrics, resCasamento, resEventos, resFotos, resPresentes, resRsvps, resRecados] =
        await Promise.all([
          fetch('/api/admin/dashboard').then((r) => r.json()),
          fetch('/api/admin/casamento').then((r) => r.json()),
          fetch('/api/eventos').then((r) => r.json()),
          fetch('/api/admin/fotos').then((r) => r.json()),
          fetch('/api/admin/presentes').then((r) => r.json()),
          fetch('/api/admin/rsvp').then((r) => r.json()),
          fetch('/api/admin/recados').then((r) => r.json()),
        ]);

      setMetrics(resMetrics);
      setCasamento(resCasamento);
      setEventos(resEventos);
      setFotos(resFotos);
      setPresentes(resPresentes);
      setRsvps(resRsvps);
      setRecados(resRecados);
    } catch (err) {
      console.error('Erro ao carregar dados do admin:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const showFeedback = (type: 'success' | 'error', text: string) => {
    setFeedbackMsg({ type, text });
    setTimeout(() => setFeedbackMsg(null), 4000);
  };

  // Salvar Casamento
  const handleSaveCasamento = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingCasamento(true);
    try {
      const res = await fetch('/api/admin/casamento', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(casamento),
      });
      if (res.ok) {
        showFeedback('success', 'Dados do casamento atualizados com sucesso!');
      } else {
        showFeedback('error', 'Erro ao atualizar dados.');
      }
    } catch {
      showFeedback('error', 'Erro de conexão.');
    } finally {
      setSavingCasamento(false);
    }
  };

  // Salvar Evento
  const handleSaveEvento = async (id: string, eventoData: any) => {
    try {
      const res = await fetch(`/api/admin/eventos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventoData),
      });
      if (res.ok) {
        showFeedback('success', 'Evento atualizado com sucesso!');
        loadAllData();
      }
    } catch {
      showFeedback('error', 'Erro ao atualizar evento.');
    }
  };

  // Adicionar Foto
  const handleAddFoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaFoto.url) return;
    try {
      const res = await fetch('/api/admin/fotos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaFoto),
      });
      if (res.ok) {
        showFeedback('success', 'Foto adicionada com sucesso!');
        setNovaFoto({ url: '', legenda: '', principal: false });
        loadAllData();
      }
    } catch {
      showFeedback('error', 'Erro ao adicionar foto.');
    }
  };

  // Excluir Foto
  const handleDeleteFoto = async (id: string) => {
    if (!confirm('Deseja realmente excluir esta foto?')) return;
    try {
      const res = await fetch(`/api/admin/fotos/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showFeedback('success', 'Foto excluída com sucesso.');
        loadAllData();
      }
    } catch {
      showFeedback('error', 'Erro ao excluir foto.');
    }
  };

  // Adicionar Presente
  const handleAddPresente = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoPresente.nome || !novoPresente.valor) return;
    try {
      const res = await fetch('/api/admin/presentes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoPresente),
      });
      if (res.ok) {
        showFeedback('success', 'Presente cadastrado com sucesso!');
        setNovoPresente({
          nome: '',
          categoria: 'Geral',
          descricao: '',
          imagem: '/images/presentes/padrao.jpg',
          valor: '',
        });
        loadAllData();
      }
    } catch {
      showFeedback('error', 'Erro ao cadastrar presente.');
    }
  };

  // Atualizar Presente
  const handleUpdatePresente = async (id: string, updatedData: any) => {
    try {
      const res = await fetch(`/api/admin/presentes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (res.ok) {
        showFeedback('success', 'Presente atualizado com sucesso!');
        setEditingPresente(null);
        loadAllData();
      }
    } catch {
      showFeedback('error', 'Erro ao atualizar presente.');
    }
  };

  // Excluir Presente
  const handleDeletePresente = async (id: string) => {
    if (!confirm('Deseja excluir este item da lista de presentes?')) return;
    try {
      const res = await fetch(`/api/admin/presentes/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showFeedback('success', 'Presente excluído com sucesso.');
        loadAllData();
      }
    } catch {
      showFeedback('error', 'Erro ao excluir presente.');
    }
  };

  // Aprovar Recado
  const handleAprovarRecado = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/recados/${id}/aprovar`, { method: 'PUT' });
      if (res.ok) {
        showFeedback('success', 'Recado aprovado com sucesso!');
        loadAllData();
      }
    } catch {
      showFeedback('error', 'Erro ao aprovar recado.');
    }
  };

  // Excluir Recado
  const handleDeleteRecado = async (id: string) => {
    if (!confirm('Deseja realmente excluir este recado?')) return;
    try {
      const res = await fetch(`/api/admin/recados/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showFeedback('success', 'Recado removido.');
        loadAllData();
      }
    } catch {
      showFeedback('error', 'Erro ao excluir recado.');
    }
  };

  // Excluir RSVP
  const handleDeleteRsvp = async (id: string) => {
    if (!confirm('Deseja excluir esta confirmação de presença?')) return;
    try {
      const res = await fetch(`/api/admin/rsvp/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showFeedback('success', 'Confirmação excluída.');
        loadAllData();
      }
    } catch {
      showFeedback('error', 'Erro ao excluir confirmação.');
    }
  };

  // Filtro de RSVP
  const filteredRsvps = rsvps.filter((r) => {
    if (rsvpFilter === 'confirmados') return r.presente;
    if (rsvpFilter === 'nao_confirmados') return !r.presente;
    return true;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-[#6B7280]">
        <RefreshCw className="w-8 h-8 animate-spin text-[#52796F] mb-3" />
        <p className="text-sm font-sans font-medium">Carregando painel administrativo...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Toast Feedback */}
      {feedbackMsg && (
        <div
          className={`fixed bottom-6 right-6 z-50 p-4 rounded-xl shadow-xl text-xs font-semibold uppercase tracking-wider animate-in slide-in-from-bottom-5 duration-300 ${
            feedbackMsg.type === 'success'
              ? 'bg-[#52796F] text-white'
              : 'bg-red-600 text-white'
          }`}
        >
          {feedbackMsg.text}
        </div>
      )}

      {/* Navegação de Abas */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E8DFD5]">
        {[
          { id: 'dashboard', label: 'Dashboard & Métricas', icon: Users },
          { id: 'casamento', label: 'Dados dos Noivos', icon: Settings },
          { id: 'eventos', label: 'Cerimônia & Recepção', icon: Calendar },
          { id: 'fotos', label: 'Fotos da Galeria', icon: ImageIcon },
          { id: 'presentes', label: 'Lista de Presentes', icon: Gift },
          { id: 'rsvp', label: 'Lista de RSVP', icon: UserCheck },
          { id: 'recados', label: 'Mural de Recados', icon: MessageSquare },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#52796F] text-white shadow-xs'
                  : 'bg-white text-[#6B7280] hover:bg-[#E8DFD5]/40 hover:text-[#2C302E]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.id === 'recados' && metrics?.recadosPendentes > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#C5A880] text-white text-[10px] flex items-center justify-center font-bold">
                  {metrics.recadosPendentes}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ABA 1: DASHBOARD */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div>
            <h2 className="text-2xl font-serif font-bold text-[#2C302E]">Resumo Geral</h2>
            <p className="text-xs text-[#6B7280] mt-1">Métricas atualizadas do casamento</p>
          </div>

          {/* Cards de Métricas */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white p-5 rounded-2xl border border-[#E8DFD5] shadow-xs">
              <span className="text-[11px] uppercase tracking-wider text-[#6B7280] font-semibold block mb-1">
                Confirmados
              </span>
              <span className="text-3xl font-serif font-bold text-[#52796F]">
                {metrics?.confirmados || 0}
              </span>
              <span className="text-[11px] text-[#6B7280] block mt-1">presenças confirmadas</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E8DFD5] shadow-xs">
              <span className="text-[11px] uppercase tracking-wider text-[#6B7280] font-semibold block mb-1">
                Não Confirmados
              </span>
              <span className="text-3xl font-serif font-bold text-red-500">
                {metrics?.naoConfirmados || 0}
              </span>
              <span className="text-[11px] text-[#6B7280] block mt-1">recusaram convite</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E8DFD5] shadow-xs">
              <span className="text-[11px] uppercase tracking-wider text-[#6B7280] font-semibold block mb-1">
                Adultos
              </span>
              <span className="text-3xl font-serif font-bold text-[#2C302E]">
                {metrics?.totalAdultos || 0}
              </span>
              <span className="text-[11px] text-[#6B7280] block mt-1">total de adultos</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E8DFD5] shadow-xs">
              <span className="text-[11px] uppercase tracking-wider text-[#6B7280] font-semibold block mb-1">
                Crianças
              </span>
              <span className="text-3xl font-serif font-bold text-[#C5A880]">
                {metrics?.totalCriancas || 0}
              </span>
              <span className="text-[11px] text-[#6B7280] block mt-1">até 10 anos</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E8DFD5] shadow-xs">
              <span className="text-[11px] uppercase tracking-wider text-[#6B7280] font-semibold block mb-1">
                Recados Pendentes
              </span>
              <span className="text-3xl font-serif font-bold text-amber-600">
                {metrics?.recadosPendentes || 0}
              </span>
              <span className="text-[11px] text-[#6B7280] block mt-1">aguardando aprovação</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E8DFD5] shadow-xs">
              <span className="text-[11px] uppercase tracking-wider text-[#6B7280] font-semibold block mb-1">
                Presentes Disponíveis
              </span>
              <span className="text-3xl font-serif font-bold text-[#52796F]">
                {metrics?.presentesDisponiveis || 0}
              </span>
              <span className="text-[11px] text-[#6B7280] block mt-1">itens na lista</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E8DFD5] shadow-xs">
              <span className="text-[11px] uppercase tracking-wider text-[#6B7280] font-semibold block mb-1">
                Presentes Escolhidos
              </span>
              <span className="text-3xl font-serif font-bold text-[#2C302E]">
                {metrics?.presentesEscolhidos || 0}
              </span>
              <span className="text-[11px] text-[#6B7280] block mt-1">já presenteados</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E8DFD5] shadow-xs">
              <span className="text-[11px] uppercase tracking-wider text-[#6B7280] font-semibold block mb-1">
                Total de Confirmações
              </span>
              <span className="text-3xl font-serif font-bold text-[#2C302E]">
                {metrics?.totalConfirmacoes || 0}
              </span>
              <span className="text-[11px] text-[#6B7280] block mt-1">respostas recebidas</span>
            </div>
          </div>
        </div>
      )}

      {/* ABA 2: CASAMENTO */}
      {activeTab === 'casamento' && casamento && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8DFD5] shadow-xs space-y-6 animate-in fade-in duration-300">
          <div>
            <h2 className="text-xl font-serif font-bold text-[#2C302E]">Configurações Gerais do Casal</h2>
            <p className="text-xs text-[#6B7280] mt-1">Edite nomes, data e textos principais do site</p>
          </div>

          <form onSubmit={handleSaveCasamento} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C302E] mb-1.5">
                  Nome da Noiva
                </label>
                <input
                  type="text"
                  value={casamento.nomeNoiva}
                  onChange={(e) => setCasamento({ ...casamento, nomeNoiva: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFD5] text-sm focus:ring-2 focus:ring-[#52796F] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C302E] mb-1.5">
                  Nome do Noivo
                </label>
                <input
                  type="text"
                  value={casamento.nomeNoivo}
                  onChange={(e) => setCasamento({ ...casamento, nomeNoivo: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFD5] text-sm focus:ring-2 focus:ring-[#52796F] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C302E] mb-1.5">
                  Data e Horário do Casamento (ISO ou YYYY-MM-DDTHH:mm)
                </label>
                <input
                  type="text"
                  value={casamento.data}
                  onChange={(e) => setCasamento({ ...casamento, data: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFD5] text-sm focus:ring-2 focus:ring-[#52796F] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C302E] mb-1.5">
                  URL do Arquivo de Música
                </label>
                <input
                  type="text"
                  value={casamento.musicaUrl}
                  onChange={(e) => setCasamento({ ...casamento, musicaUrl: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFD5] text-sm focus:ring-2 focus:ring-[#52796F] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C302E] mb-1.5">
                Mensagem Inicial dos Noivos
              </label>
              <textarea
                rows={4}
                value={casamento.mensagemInicial}
                onChange={(e) => setCasamento({ ...casamento, mensagemInicial: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFD5] text-sm focus:ring-2 focus:ring-[#52796F] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C302E] mb-1.5">
                Nossa História
              </label>
              <textarea
                rows={5}
                value={casamento.historia}
                onChange={(e) => setCasamento({ ...casamento, historia: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFD5] text-sm focus:ring-2 focus:ring-[#52796F] outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={savingCasamento}
              className="px-6 py-2.5 rounded-xl bg-[#52796F] hover:bg-[#354F52] text-white text-xs font-semibold uppercase tracking-wider shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{savingCasamento ? 'Salvando...' : 'Salvar Alterações'}</span>
            </button>
          </form>
        </div>
      )}

      {/* ABA 3: EVENTOS (CERIMÔNIA & RECEPÇÃO) */}
      {activeTab === 'eventos' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div>
            <h2 className="text-xl font-serif font-bold text-[#2C302E]">Cerimônia e Recepção</h2>
            <p className="text-xs text-[#6B7280] mt-1">Configure horários, endereços e mapas</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {eventos.map((evento) => (
              <div
                key={evento.id}
                className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E8DFD5] shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between border-b border-[#E8DFD5] pb-3">
                  <h3 className="font-serif font-bold text-lg text-[#2C302E]">
                    {evento.tipo === 'cerimonia' ? 'Cerimônia Religiosa' : 'Recepção dos Noivos'}
                  </h3>
                  <span className="text-xs uppercase font-semibold text-[#C5A880]">
                    {evento.tipo}
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#2C302E] mb-1">
                      Título
                    </label>
                    <input
                      type="text"
                      defaultValue={evento.titulo}
                      onBlur={(e) => handleSaveEvento(evento.id, { titulo: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#E8DFD5] text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#2C302E] mb-1">
                        Data
                      </label>
                      <input
                        type="text"
                        defaultValue={evento.data}
                        onBlur={(e) => handleSaveEvento(evento.id, { data: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-[#E8DFD5] text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#2C302E] mb-1">
                        Horário
                      </label>
                      <input
                        type="text"
                        defaultValue={evento.horario}
                        onBlur={(e) => handleSaveEvento(evento.id, { horario: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-[#E8DFD5] text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#2C302E] mb-1">
                      Endereço Completo
                    </label>
                    <input
                      type="text"
                      defaultValue={evento.endereco}
                      onBlur={(e) => handleSaveEvento(evento.id, { endereco: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#E8DFD5] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#2C302E] mb-1">
                      URL do Google Maps (Botão Como Chegar)
                    </label>
                    <input
                      type="text"
                      defaultValue={evento.mapsUrl}
                      onBlur={(e) => handleSaveEvento(evento.id, { mapsUrl: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#E8DFD5] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#2C302E] mb-1">
                      Descrição
                    </label>
                    <textarea
                      rows={3}
                      defaultValue={evento.descricao}
                      onBlur={(e) => handleSaveEvento(evento.id, { descricao: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#E8DFD5] text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ABA 4: FOTOS */}
      {activeTab === 'fotos' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-serif font-bold text-[#2C302E]">Fotos da Galeria</h2>
              <p className="text-xs text-[#6B7280] mt-1">Adicione ou gerencie as fotos exibidas no site</p>
            </div>
          </div>

          {/* Form Adicionar Foto */}
          <div className="bg-white p-6 rounded-2xl border border-[#E8DFD5] shadow-xs">
            <h3 className="text-xs uppercase font-semibold text-[#52796F] tracking-wider mb-4">
              Adicionar Nova Imagem
            </h3>
            <form onSubmit={handleAddFoto} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
              <div className="sm:col-span-6">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#2C302E] mb-1">
                  URL da Foto
                </label>
                <input
                  type="text"
                  required
                  placeholder="/images/sua-foto.jpg ou URL completa"
                  value={novaFoto.url}
                  onChange={(e) => setNovaFoto({ ...novaFoto, url: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8DFD5] text-sm"
                />
              </div>

              <div className="sm:col-span-4">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#2C302E] mb-1">
                  Legenda (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ex: Viagem inesquecível"
                  value={novaFoto.legenda}
                  onChange={(e) => setNovaFoto({ ...novaFoto, legenda: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8DFD5] text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#52796F] hover:bg-[#354F52] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  Adicionar
                </button>
              </div>
            </form>
          </div>

          {/* Grid de Fotos Existentes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {fotos.map((foto) => (
              <div
                key={foto.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#E8DFD5] shadow-xs flex flex-col justify-between group"
              >
                <div className="relative aspect-video bg-gray-100">
                  <img src={foto.url} alt={foto.legenda || 'Foto'} className="w-full h-full object-cover" />
                  {foto.principal && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#52796F] text-white text-[10px] font-semibold uppercase tracking-wider">
                      Principal
                    </span>
                  )}
                </div>
                <div className="p-3 flex items-center justify-between text-xs">
                  <span className="truncate max-w-[120px] text-[#6B7280]">
                    {foto.legenda || 'Sem legenda'}
                  </span>
                  <button
                    onClick={() => handleDeleteFoto(foto.id)}
                    className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ABA 5: PRESENTES */}
      {activeTab === 'presentes' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div>
            <h2 className="text-xl font-serif font-bold text-[#2C302E]">Lista de Presentes</h2>
            <p className="text-xs text-[#6B7280] mt-1">
              Cadastre novos presentes, edite valores e visualize quem escolheu cada item
            </p>
          </div>

          {/* Formulário Novo Presente */}
          <div className="bg-white p-6 rounded-2xl border border-[#E8DFD5] shadow-xs">
            <h3 className="text-xs uppercase font-semibold text-[#52796F] tracking-wider mb-4">
              Cadastrar Novo Presente
            </h3>
            <form onSubmit={handleAddPresente} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#2C302E] mb-1">
                    Nome do Presente *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Jogo de Pratos"
                    value={novoPresente.nome}
                    onChange={(e) => setNovoPresente({ ...novoPresente, nome: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E8DFD5] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#2C302E] mb-1">
                    Categoria
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Cozinha, Lua de Mel"
                    value={novoPresente.categoria}
                    onChange={(e) => setNovoPresente({ ...novoPresente, categoria: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E8DFD5] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#2C302E] mb-1">
                    Valor (R$) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="Ex: 350.00"
                    value={novoPresente.valor}
                    onChange={(e) => setNovoPresente({ ...novoPresente, valor: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E8DFD5] text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#2C302E] mb-1">
                    URL da Imagem
                  </label>
                  <input
                    type="text"
                    value={novoPresente.imagem}
                    onChange={(e) => setNovoPresente({ ...novoPresente, imagem: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E8DFD5] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#2C302E] mb-1">
                    Descrição
                  </label>
                  <input
                    type="text"
                    placeholder="Breve descrição do item..."
                    value={novoPresente.descricao}
                    onChange={(e) => setNovoPresente({ ...novoPresente, descricao: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E8DFD5] text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#52796F] hover:bg-[#354F52] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                Cadastrar Presente
              </button>
            </form>
          </div>

          {/* Tabela de Presentes */}
          <div className="bg-white rounded-2xl border border-[#E8DFD5] shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF7F2] border-b border-[#E8DFD5] uppercase text-[#6B7280] tracking-wider font-semibold">
                  <tr>
                    <th className="p-4">Item</th>
                    <th className="p-4">Categoria</th>
                    <th className="p-4">Valor</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Escolhido Por</th>
                    <th className="p-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8DFD5]/60">
                  {presentes.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="p-4 font-semibold text-[#2C302E] flex items-center gap-3">
                        <img src={p.imagem} alt={p.nome} className="w-10 h-10 object-cover rounded-lg" />
                        <div>
                          <p className="font-serif text-sm font-semibold">{p.nome}</p>
                          <p className="text-[11px] text-[#6B7280] font-normal truncate max-w-xs">
                            {p.descricao}
                          </p>
                        </div>
                      </td>
                      <td className="p-4 text-[#6B7280]">{p.categoria || 'Geral'}</td>
                      <td className="p-4 font-serif font-bold text-[#52796F] text-sm">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                          p.valor
                        )}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() =>
                            handleUpdatePresente(p.id, {
                              disponivel: !p.disponivel,
                              escolhidoPor: p.disponivel ? 'Noivos (Manual)' : null,
                            })
                          }
                          className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider cursor-pointer ${
                            p.disponivel
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-gray-100 text-gray-700 border border-gray-200'
                          }`}
                        >
                          {p.disponivel ? 'Disponível' : 'Indisponível'}
                        </button>
                      </td>
                      <td className="p-4">
                        {p.escolhidoPor ? (
                          <div>
                            <span className="font-semibold text-[#2C302E]">{p.escolhidoPor}</span>
                            {p.mensagemConvidado && (
                              <p className="text-[10px] text-[#6B7280] italic mt-0.5">
                                &quot;{p.mensagemConvidado}&quot;
                              </p>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => handleDeletePresente(p.id)}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ABA 6: RSVP */}
      {activeTab === 'rsvp' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-serif font-bold text-[#2C302E]">Confirmações de Presença</h2>
              <p className="text-xs text-[#6B7280] mt-1">Lista completa de convidados que responderam</p>
            </div>

            {/* Filtros */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setRsvpFilter('todos')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                  rsvpFilter === 'todos' ? 'bg-[#52796F] text-white' : 'bg-white border text-[#6B7280]'
                }`}
              >
                Todos ({rsvps.length})
              </button>
              <button
                onClick={() => setRsvpFilter('confirmados')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                  rsvpFilter === 'confirmados'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white border text-emerald-700'
                }`}
              >
                Confirmados ({rsvps.filter((r) => r.presente).length})
              </button>
              <button
                onClick={() => setRsvpFilter('nao_confirmados')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                  rsvpFilter === 'nao_confirmados'
                    ? 'bg-red-600 text-white'
                    : 'bg-white border text-red-600'
                }`}
              >
                Não Confirmados ({rsvps.filter((r) => !r.presente).length})
              </button>
            </div>
          </div>

          {/* Tabela de RSVP */}
          <div className="bg-white rounded-2xl border border-[#E8DFD5] shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF7F2] border-b border-[#E8DFD5] uppercase text-[#6B7280] tracking-wider font-semibold">
                  <tr>
                    <th className="p-4">Nome do Convidado</th>
                    <th className="p-4">Telefone / E-mail</th>
                    <th className="p-4">Presença</th>
                    <th className="p-4">Adultos</th>
                    <th className="p-4">Crianças</th>
                    <th className="p-4">Acompanhante / Obs</th>
                    <th className="p-4 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8DFD5]/60">
                  {filteredRsvps.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="p-4 font-semibold text-[#2C302E]">
                        <span className="font-serif text-sm">{r.nome}</span>
                        <span className="block text-[10px] text-[#6B7280] font-normal">
                          {new Date(r.createdAt).toLocaleString('pt-BR')}
                        </span>
                      </td>
                      <td className="p-4 text-[#6B7280]">
                        <span className="font-medium text-[#2C302E] block">{r.telefone}</span>
                        <span className="text-[11px]">{r.email}</span>
                      </td>
                      <td className="p-4">
                        {r.presente ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle className="w-3.5 h-3.5" />
                            Confirmado
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-red-50 text-red-600 border border-red-200">
                            <XCircle className="w-3.5 h-3.5" />
                            Não irá
                          </span>
                        )}
                      </td>
                      <td className="p-4 font-semibold text-center sm:text-left">{r.adultos}</td>
                      <td className="p-4 font-semibold text-center sm:text-left">{r.criancas}</td>
                      <td className="p-4 max-w-xs">
                        {r.acompanhante && (
                          <p className="text-xs text-[#2C302E]">
                            <strong>Acomp:</strong> {r.acompanhante}
                          </p>
                        )}
                        {r.observacoes && (
                          <p className="text-[11px] text-[#6B7280] italic mt-0.5 truncate">
                            {r.observacoes}
                          </p>
                        )}
                        {!r.acompanhante && !r.observacoes && <span className="text-gray-400">—</span>}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDeleteRsvp(r.id)}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ABA 7: RECADOS */}
      {activeTab === 'recados' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div>
            <h2 className="text-xl font-serif font-bold text-[#2C302E]">Moderação do Mural de Recados</h2>
            <p className="text-xs text-[#6B7280] mt-1">
              Apenas recados aprovados aparecem publicamente no site dos noivos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recados.map((recado) => (
              <div
                key={recado.id}
                className={`bg-white p-6 rounded-2xl border shadow-xs flex flex-col justify-between ${
                  recado.aprovado ? 'border-[#E8DFD5]' : 'border-amber-300 bg-amber-50/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-base text-[#2C302E]">
                        {recado.nome}
                      </span>
                      {recado.aprovado ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[9px] uppercase font-bold tracking-wider bg-emerald-100 text-emerald-800">
                          Aprovado
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[9px] uppercase font-bold tracking-wider bg-amber-100 text-amber-800 animate-pulse">
                          Pendente
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#6B7280]">
                      {new Date(recado.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>

                  <p className="text-sm text-[#2C302E]/90 italic font-serif leading-relaxed mb-6">
                    &quot;{recado.mensagem}&quot;
                  </p>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                  {!recado.aprovado && (
                    <button
                      onClick={() => handleAprovarRecado(recado.id)}
                      className="px-4 py-2 rounded-xl bg-[#52796F] hover:bg-[#354F52] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>APROVAR</span>
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteRecado(recado.id)}
                    className="px-4 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>EXCLUIR</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
