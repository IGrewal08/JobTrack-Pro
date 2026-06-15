type Props = {
    label: string;
    value: string | number;
    sub?: string;
    accent?: string;
}

export function StatCard({ label, value, sub, accent = "#378ADD" }: Props) {
    return (
        <div style={{
            flex: 1,
            minWidth: "140px",
            padding: "1rem 1.25 rem",
            borderRadius: "8px",
            border: "0.5px solid #e0ddd6",
            borderLeft: `4px solid ${accent}`,
            display: "flex",
            flexDirection: "column",
            gap: "4px",
        }}>
        <p style={{ margin: 0, fontSize: "11px", fontWeight: 500,
            letterSpacing: "0.06em", textTransform: "uppercase", color: "#888780"
         }}>
            {label}
        </p>
        <p style={{ margin: 0, fontSize: "32px", fontWeight: 500, lineHeight: 1.1 }}>
            {value}
        </p>
        {sub && (
            <p style={{ margin: 0, fontSize: "12px", color: "#888780" }}>{sub}</p>
        )}
        </div>
    );
}