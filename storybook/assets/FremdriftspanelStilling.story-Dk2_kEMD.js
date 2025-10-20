import{ac as I,ad as w,j as t,R as k,S as j,ch as x,cl as b,aG as g,ci as u,aP as y,cy as _}from"./iframe-C8w3jQxa.js";import{w as d,c as D}from"./ContextDecorators-BlzPAe4F.js";import{F as N,A as v}from"./FullførtStilling-BLRNJV4W.js";import{R as T}from"./GjenåpneStillingKnapp-8O6UiUll.js";import{T as A}from"./TilgangskontrollForInnhold-CSs_UO3W.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-BVYVQHvA.js";import"./OrganisasjonsnummerAlert-Cze3Hgfm.js";import"./VStack-CAbXWkSv.js";import"./BasePrimitive-BROnwPJ2.js";import"./List-0qiMuAjb.js";import"./Link-DjfLdA4d.js";import"./KandidatHendelseTag-B3bAFX8N.js";import"./Tag-C0rwH5pF.js";import"./ChatExclamationmark-aPjr0abY.js";import"./FileXMark-BpLpt36-.js";import"./Trash-BLUhIqIK.js";import"./HandShakeHeart-B_vPzC3T.js";import"./Calendar-DBSoqUNW.js";import"./ThumbUp-B22CcxHd.js";import"./Table-DZ4c3E2u.js";import"./util-D3MbZe3k.js";import"./format-n5F6r33y.js";import"./match-9uiui95j.js";import"./parseISO-DzVh93mM.js";import"./parse-B5EqXZBM.js";import"./getDefaultOptions-CusdfGXI.js";import"./util-vxjLQGim.js";import"./accordion-CVbj_PAh.js";import"./index-BQe7mr-v.js";import"./index-BfEzXyfB.js";import"./index-QJwN1LoB.js";import"./ChevronDown-GRqF1mXI.js";import"./Box-Duv3aEmL.js";import"./Bell-Cis83o4I.js";import"./PersonChat-Olnv56nD.js";import"./Eye-CW0eI-AJ.js";import"./ProgressBar-DxQFIozV.js";import"./EyeSlash-DSsy5OAK.js";import"./CircleSlash-BsXTRzoO.js";import"./Modal-hL95cYpi.js";import"./floating-ui.react-mzmR1DFu.js";import"./Date.Input-DDRk_EfF.js";import"./useFormField-DgNx6Vtv.js";import"./useControllableState-Cc6Yk2cp.js";import"./Modal.context-fjbQwAhG.js";import"./Checkbox-Bu8hOPC7.js";import"./Fieldset-DFy947iS.js";import"./Pencil-BrGcPlun.js";import"./PersonbrukerTekst-Dt4jY8II.js";import"./ClockDashed-BTfebzoB.js";import"./Tasklist-D9pWJbet.js";import"./ErrorBoundary-Dfluqj6V.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),m=w(i,E),c=m.error;return c?.status===404||c?.message?.includes("404")||c&&!m.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[m],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>d(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>d(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return d(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return d(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Lt as default};
