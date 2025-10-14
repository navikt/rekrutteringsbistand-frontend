import{ac as I,ad as w,j as t,R as k,S as j,cn as x,cp as b,aG as g,cB as u,aP as y,cC as _}from"./iframe-qbxWu-tL.js";import{w as d,c as D}from"./ContextDecorators-CW1XdCOs.js";import{F as N,A as v}from"./FullførtStilling-DISGsi5F.js";import{R as T}from"./GjenåpneStillingKnapp-CtmXGNpX.js";import{T as A}from"./TilgangskontrollForInnhold-Cbf6wIfg.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-BD3InuPO.js";import"./OrganisasjonsnummerAlert-BWKDpgDo.js";import"./VStack-B7tXZA4Y.js";import"./BasePrimitive-DyceG6iL.js";import"./List-az-G9Gs6.js";import"./Link-CMfq6tzZ.js";import"./KandidatHendelseTag-BPmdHITi.js";import"./Tag-Da1ytOY7.js";import"./FileXMark-CyLkFvxR.js";import"./Trash-DwQmtt3l.js";import"./HandShakeHeart-BEAefxb0.js";import"./Calendar-DZnwDkgC.js";import"./ThumbUp-C8ckDx0E.js";import"./Table-Bpm0fpGA.js";import"./util-DlAq864K.js";import"./format-DZhR8Qj7.js";import"./match-D2AgsI69.js";import"./parseISO-OQUDCsPR.js";import"./parse-hffK4nP2.js";import"./getDefaultOptions-BSPEM21I.js";import"./util-C1rHrxvH.js";import"./accordion-CZa0Cqd4.js";import"./index-BYe4spl9.js";import"./index-DbL3t8L3.js";import"./index-BHBOWq3v.js";import"./ChevronDown-CHhAtIRd.js";import"./Box-yhTuh1r0.js";import"./Bell-DSfAt_LJ.js";import"./PersonChat-DdmXQ8lb.js";import"./Eye-CsW2oeZS.js";import"./ProgressBar-H-ItKmT-.js";import"./EyeSlash-DLvt4MGP.js";import"./CircleSlash-Bmldl46U.js";import"./Modal-BdvvbpSe.js";import"./floating-ui.react-DtoBFu6j.js";import"./Date.Input-DXqbNpVA.js";import"./useFormField-Bw2yyyAS.js";import"./useControllableState-BJR-n7iR.js";import"./Modal.context-DGzify1k.js";import"./Checkbox-SAZzQ4uP.js";import"./Fieldset-uXptwJXp.js";import"./Pencil-D5LtUe1a.js";import"./PersonbrukerTekst-Ce_jRmic.js";import"./ClockDashed-QWNfIOFM.js";import"./Tasklist-CZDe4X0O.js";import"./ErrorBoundary-BK2WIxcb.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),m=w(i,E),c=m.error;return c?.status===404||c?.message?.includes("404")||c&&!m.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[m],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const vt={tags:["autodocs"],component:n},l={render:()=>d(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>d(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return d(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return d(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,vt as default};
