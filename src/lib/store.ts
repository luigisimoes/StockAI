import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ConversationEntry = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
};

interface StoreState {
  // Selection (using array instead of Set to avoid serialization issues)
  selectedIds: number[];
  toggleSelect: (id: number) => void;
  clearSelection: () => void;
  selectAll: (ids: number[]) => void;
  isSelected: (id: number) => boolean;

  // Drawer
  selectedItemId: number | null;
  openDrawer: (id: number) => void;
  closeDrawer: () => void;

  // Bulk dialog
  bulkDialogOpen: boolean;
  openBulkDialog: () => void;
  closeBulkDialog: () => void;

  // Approvals
  approvals: Record<number, { units: number; approvedAt: string }>;
  approve: (id: number, units: number) => void;
  undo: (id: number) => void;
  bulkApprove: (ids: number[], defaultUnits: Record<number, number>) => void;

  // Dismissals
  dismissals: Record<number, { reason: string; dismissedAt: string }>;
  dismiss: (id: number, reason: string) => void;

  // Conversation history (Ask AI)
  conversations: Record<number, ConversationEntry[]>;
  addMessage: (recId: number, entry: ConversationEntry) => void;
  clearConversation: (recId: number) => void;

  // Reset
  resetAll: () => void;
}

const initialState = {
  selectedIds: [] as number[],
  selectedItemId: null as number | null,
  bulkDialogOpen: false,
  approvals: {} as Record<number, { units: number; approvedAt: string }>,
  dismissals: {} as Record<number, { reason: string; dismissedAt: string }>,
  conversations: {} as Record<number, ConversationEntry[]>,
};

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      ...initialState,

      toggleSelect: (id) =>
        set((state) => {
          const exists = state.selectedIds.includes(id);
          return {
            selectedIds: exists
              ? state.selectedIds.filter((x) => x !== id)
              : [...state.selectedIds, id],
          };
        }),

      clearSelection: () => set({ selectedIds: [] }),

      selectAll: (ids) => set({ selectedIds: [...ids] }),

      isSelected: (id) => get().selectedIds.includes(id),

      openDrawer: (id) => set({ selectedItemId: id }),
      closeDrawer: () => set({ selectedItemId: null }),

      openBulkDialog: () => set({ bulkDialogOpen: true }),
      closeBulkDialog: () => set({ bulkDialogOpen: false }),

      approve: (id, units) =>
        set((state) => ({
          approvals: {
            ...state.approvals,
            [id]: { units, approvedAt: new Date().toISOString() },
          },
          selectedIds: state.selectedIds.filter((x) => x !== id),
        })),

      undo: (id) =>
        set((state) => {
          const { [id]: _, ...rest } = state.approvals;
          return { approvals: rest };
        }),

      bulkApprove: (ids, defaultUnits) =>
        set((state) => {
          const next = { ...state.approvals };
          const now = new Date().toISOString();
          ids.forEach((id) => {
            next[id] = { units: defaultUnits[id] ?? 0, approvedAt: now };
          });
          return { approvals: next, selectedIds: [], bulkDialogOpen: false };
        }),

      dismiss: (id, reason) =>
        set((state) => ({
          dismissals: {
            ...state.dismissals,
            [id]: { reason, dismissedAt: new Date().toISOString() },
          },
          selectedIds: state.selectedIds.filter((x) => x !== id),
        })),

      addMessage: (recId, entry) =>
        set((state) => ({
          conversations: {
            ...state.conversations,
            [recId]: [...(state.conversations[recId] ?? []), entry],
          },
        })),

      clearConversation: (recId) =>
        set((state) => {
          const { [recId]: _, ...rest } = state.conversations;
          return { conversations: rest };
        }),

      resetAll: () => set(initialState),
    }),
    {
      name: 'stockai-replen-store',
    }
  )
);
