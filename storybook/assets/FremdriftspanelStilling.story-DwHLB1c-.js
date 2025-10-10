import{f as I,j as t,l as k,S as w,hE as j,hP as u,hQ as x}from"./iframe-DYYFo0EH.js";import{w as m,c as A}from"./ContextDecorators-AgeIh8WY.js";import{K as b}from"./schema.zod-C8mMWEfD.js";import{u as y}from"./useKandidatlisteForEier-0rtv0Wnw.js";import{R as T,F as _,A as N}from"./FullførtStilling-C2iewVdw.js";import{K as g,I as v}from"./KandidatTyper-CkRsvxsW.js";import{T as E}from"./TilgangskontrollForInnhold-DmBvtx0h.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DrLAHCvX.js";import"./OrganisasjonsnummerAlert-HgqZSHB0.js";import"./VStack-j-RBo0EF.js";import"./BasePrimitive-B0IXe4ka.js";import"./List-DTt7xmmf.js";import"./Link-CNFJiH9C.js";import"./KandidatHendelseTag-DVUA1DLO.js";import"./Tag-D2CeUP6F.js";import"./FileXMark-CsvJoHtv.js";import"./Trash-CevoRqAe.js";import"./HandShakeHeart-XuBXKhfa.js";import"./Calendar-DiB-DZyk.js";import"./ThumbUp-DEb0cCvQ.js";import"./Table-DWEIgR03.js";import"./util-DLV4rgvl.js";import"./format-bK3tkYVY.js";import"./match-DHpari-S.js";import"./parseISO-Cld3lj8D.js";import"./parse-L4yLavaV.js";import"./getDefaultOptions-D_tEuKPk.js";import"./util-ChfO-3K-.js";import"./kandidat.mock-DovXylbF.js";import"./innsatsgrupper-BqldBv0r.js";import"./index-HY4Jgd-R.js";import"./oppdaterStilling-BtRFXy7Y.js";import"./Box-CIYjCFdX.js";import"./EyeSlash-Dm-_MvC0.js";import"./CircleSlash-BkxsaTzT.js";import"./Modal-CNZnnLcK.js";import"./floating-ui.react-2_orn2KK.js";import"./Date.Input-9XOu-ODO.js";import"./useFormField-BPvZy4Bw.js";import"./useControllableState-C1UEeCeb.js";import"./ChevronDown-BUmHjXl6.js";import"./Modal.context-D42TXc5u.js";import"./Checkbox-CJUM0Iab.js";import"./Fieldset-TRLXYfMo.js";import"./Pencil-Bd4zZsOx.js";import"./ClockDashed-BRYFIksf.js";import"./PersonChat-BVn7qNz0.js";import"./Tasklist-BOIOQzVH.js";import"./accordion-C-m0-j0k.js";import"./index-cQITl5S0.js";import"./index-B4w3ENGW.js";import"./index-rYmb9wM5.js";import"./Bell-BnlhPWYt.js";import"./Eye-DQngcMfb.js";import"./ProgressBar-CwvuALOU.js";import"./ErrorBoundary-CK2SksSx.js";function n({dropDown:r}){const{stillingsData:i,erEier:D}=I(),d=y(i,D),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(w,{hooks:[d],children:e=>{const F=e.status===b.Lukket&&i.stilling.status===j.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(R=>R.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,h=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+h;return F?t.jsx(_,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(N,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Gt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:v.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=x,i=A({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    // Lukket kandidatliste og stoppet stilling -> Fullført visning
    const stillingsData = {
      ...mockBaseStilling,
      stilling: {
        ...mockBaseStilling.stilling,
        status: 'INACTIVE',
        publishedByAdmin: mockBaseStilling.stilling.publishedByAdmin || new Date().toISOString()
      }
    } as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      lukket: true,
      antall: 4,
      status: InternKandidatstatus.AKTUELL,
      utfall: KandidatutfallTyper.FATT_JOBBEN,
      stillingsData
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />, liste, stillingsData);
  }
}`,...a.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const stillingsData = mockFormidling as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      stillingsData,
      antall: 2
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />, liste, stillingsData);
  }
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Gt as default};
