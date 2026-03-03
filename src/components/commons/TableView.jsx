import { useMemo } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Table from "../../pages/Table";
import { Eye } from "lucide-react";

const TableView = () => {
  const navigate = useNavigate();
  const { movies } = useOutletContext();

  const columns = useMemo(
    () => [
      {
        header: "Title",
        accessorKey: "title",
      },
      {
        header: "Release Date",
        accessorKey: "release_date",
      },
      {
        header: "Action",
        cell: ({ row }) => (
          <button
            onClick={() => navigate(`/browse/${row.original.id}`)}
            className="text-blue-400 hover:text-blue-400/50"
          >
            <Eye size={12} />
          </button>
        ),
      },
    ],
    [navigate]
  );

  return <Table data={movies ?? []} columns={columns} />;
};

export default TableView;
