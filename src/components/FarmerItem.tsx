import { useNavigate } from 'react-router';
import { useState } from 'react';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Menu from '@mui/material/Menu';

import { deleteFarmerThunk } from '@/store/farmers/actions';
import { useAppDispatch } from '@/store/hooks';

type FarmerItemProps = {
  name: string;
  id: number;
};

export default function FarmerItem({ name, id }: FarmerItemProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleDelete = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    event.stopPropagation();
    dispatch(deleteFarmerThunk(id));
    setAnchorEl(null);
  };

  const handleEdit = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    event.stopPropagation();
    navigate(`/produtores/${id}/editar`);
    setAnchorEl(null);
  };

  return (
    <>
      <Paper
        elevation={4}
        className="p-3 flex justify-between items-center cursor-pointer"
        onClick={() => navigate('/produtores/' + id)}
      >
        <h3 className="text-gray-500 font-medium text-lg">{name}</h3>
        <IconButton
          aria-label="more"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleOpenMenu}
        >
          <MoreVertIcon />
        </IconButton>
      </Paper>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleEdit}>Editar</MenuItem>
        <MenuItem onClick={handleDelete}>Deletar</MenuItem>
      </Menu>
    </>
  );
}
